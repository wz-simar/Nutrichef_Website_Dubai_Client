"use client";

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";

const HEIGHT_FRAME_SRC = "/weight_selector_container.png";

const CM_MIN = 120;
const CM_MAX = 220;
const CM_STEP = 0.5;
const IN_MIN = 50;
const IN_MAX = 86;
const DRAG_SENS = 15;
const VISIBLE_RANGE = 20;

export type HeightScrollPickerProps = {
  heightCm: number;
  heightUnit: "cm" | "ft";
  onHeightCmChange: (heightCm: number) => void;
  onHeightUnitChange: (unit: "cm" | "ft") => void;
};

function inchesFromCm(heightCm: number): number {
  return Math.round(heightCm / 2.54);
}

function cmFromInches(inches: number): number {
  return Math.round(inches * 2.54 * 10) / 10;
}

function formatFtIn(totalInches: number): string {
  const ft = Math.floor(totalInches / 12);
  const inch = totalInches % 12;
  return `${ft}′${inch}″`;
}

function clampCm(v: number): number {
  return Math.min(CM_MAX, Math.max(CM_MIN, v));
}

function clampIn(v: number): number {
  return Math.min(IN_MAX, Math.max(IN_MIN, v));
}

function snapCm(v: number): number {
  return Math.round(v * 2) / 2;
}

function heightToDisplay(heightCm: number, unit: "cm" | "ft"): number {
  if (unit === "cm") return snapCm(clampCm(heightCm));
  return clampIn(inchesFromCm(heightCm));
}

function displayToHeightCm(display: number, unit: "cm" | "ft"): number {
  if (unit === "cm") return snapCm(display);
  return cmFromInches(Math.round(display));
}

function drawCurvedGauge(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  currentValue: number,
  minV: number,
  maxV: number,
  unit: "cm" | "ft",
) {
  const dpr = window.devicePixelRatio || 1;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);
  ctx.imageSmoothingEnabled = true;

  const scale = Math.min(w / 320, h / 200) || 1;
  const radius = 290 * scale;
  const centerX = (w % 2 === 1 ? 0.5 : 0) + Math.floor(w / 2);
  const centerY = h + radius - 20 * scale - 110 * scale;

  const activeColor = "#4C8548";
  const inactiveColor = "#b8c4bc";
  const labelPx = Math.max(11, Math.round(15 * scale));

  const start = Math.floor(currentValue - VISIBLE_RANGE);
  const end = Math.ceil(currentValue + VISIBLE_RANGE);

  for (let i = start; i <= end; i++) {
    if (i < minV || i > maxV) continue;
    if (i % 5 !== 0) continue;

    const diff = i - currentValue;
    const angleRad = (-90 + diff * 1.3) * (Math.PI / 180);
    const isMajor = i % 10 === 0;

    const tickLen = isMajor ? 30 : 20;
    ctx.strokeStyle = isMajor ? activeColor : inactiveColor;
    ctx.lineWidth = isMajor ? 2 : 1.5;
    ctx.lineCap = "round";

    const fixedOuterRadius = radius + 30 * scale;
    const outerR = fixedOuterRadius;
    const innerR = fixedOuterRadius - tickLen;

    const p1x = centerX + innerR * Math.cos(angleRad);
    const p1y = centerY + innerR * Math.sin(angleRad);
    const p2x = centerX + outerR * Math.cos(angleRad);
    const p2y = centerY + outerR * Math.sin(angleRad);

    ctx.beginPath();
    ctx.moveTo(p1x, p1y);
    ctx.lineTo(p2x, p2y);
    ctx.stroke();

    if (isMajor) {
      const distFromCenter = Math.abs(diff) - 40;
      const opacity = Math.max(0, Math.min(1, 1 - distFromCenter / 15));
      if (opacity > 0) {
        const textRadius = radius - 20 * scale;
        const tx = centerX + textRadius * Math.cos(angleRad);
        const ty = centerY + textRadius * Math.sin(angleRad);
        const label =
          unit === "cm" ? String(i) : formatFtIn(Math.min(IN_MAX, Math.max(IN_MIN, i)));
        ctx.save();
        ctx.translate(Math.round(tx * 10) / 10, Math.round(ty * 10) / 10);
        ctx.rotate(angleRad + Math.PI / 2);
        ctx.fillStyle = `rgba(90, 107, 98, ${opacity})`;
        ctx.font = `600 ${labelPx}px ui-sans-serif, system-ui, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(label, 0, 0);
        ctx.restore();
      }
    }
  }

  drawNeedle(ctx, scale, centerX, centerY, radius);
}

function drawNeedle(
  ctx: CanvasRenderingContext2D,
  scale: number,
  centerX: number,
  centerY: number,
  radius: number,
) {
  const outerR = radius + 30 * scale;
  const tipY = centerY - outerR;
  const baseY = tipY + Math.max(20, Math.round(26 * scale));
  const baseHalfWidth = Math.max(5, Math.round(6 * scale));

  ctx.fillStyle = "#13692F";
  ctx.beginPath();
  ctx.moveTo(centerX - baseHalfWidth, baseY);
  ctx.lineTo(centerX, tipY);
  ctx.lineTo(centerX + baseHalfWidth, baseY);
  ctx.closePath();
  ctx.fill();
}

export function HeightScrollPicker({
  heightCm,
  heightUnit,
  onHeightCmChange,
  onHeightUnitChange,
}: HeightScrollPickerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const displayRef = useRef(heightToDisplay(heightCm, heightUnit));
  const [draft, setDraft] = useState("");
  const [focused, setFocused] = useState(false);

  const minV = heightUnit === "cm" ? CM_MIN : IN_MIN;
  const maxV = heightUnit === "cm" ? CM_MAX : IN_MAX;

  const committedDisplay = heightToDisplay(heightCm, heightUnit);
  const fieldText = focused
    ? draft
    : heightUnit === "cm"
      ? snapCm(committedDisplay).toFixed(1)
      : String(Math.round(committedDisplay));

  useEffect(() => {
    if (!draggingRef.current) {
      displayRef.current = heightToDisplay(heightCm, heightUnit);
    }
  }, [heightCm, heightUnit]);

  const paint = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const rect = wrap.getBoundingClientRect();
    const displayW = Math.max(1, Math.round(rect.width));
    const displayH = Math.max(1, Math.round(rect.height));
    const dpr = window.devicePixelRatio || 1;
    const bw = Math.max(1, Math.round(displayW * dpr));
    const bh = Math.max(1, Math.round(displayH * dpr));
    canvas.width = bw;
    canvas.height = bh;
    canvas.style.width = `${displayW}px`;
    canvas.style.height = `${displayH}px`;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    drawCurvedGauge(ctx, displayW, displayH, displayRef.current, minV, maxV, heightUnit);
  }, [minV, maxV, heightUnit]);

  useLayoutEffect(() => {
    paint();
  }, [paint, heightCm, heightUnit, fieldText]);

  useEffect(() => {
    const ro = new ResizeObserver(() => paint());
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, [paint]);

  const endDrag = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    if (heightUnit === "cm") {
      displayRef.current = snapCm(displayRef.current);
    } else {
      displayRef.current = Math.round(displayRef.current);
    }
    displayRef.current = Math.min(maxV, Math.max(minV, displayRef.current));
    onHeightCmChange(displayToHeightCm(displayRef.current, heightUnit));
    paint();
  };

  const onPointerDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    draggingRef.current = true;
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    displayRef.current -= e.movementX / DRAG_SENS;
    displayRef.current = Math.min(maxV, Math.max(minV, displayRef.current));
    onHeightCmChange(displayToHeightCm(displayRef.current, heightUnit));
    if (focused) {
      if (heightUnit === "cm") setDraft(snapCm(displayRef.current).toFixed(1));
      else setDraft(String(Math.round(displayRef.current)));
    }
    paint();
  };

  const onFieldChange = (raw: string) => {
    setDraft(raw);
    const cleaned = raw.replace(/[^0-9.]/g, "");
    if (cleaned === "") return;
    const n = Number(cleaned);
    if (Number.isNaN(n)) return;
    if (heightUnit === "cm") {
      if (n < CM_MIN || n > CM_MAX) return;
      displayRef.current = n;
      onHeightCmChange(snapCm(n));
    } else {
      const ins = Math.round(n);
      if (ins < IN_MIN || ins > IN_MAX) return;
      displayRef.current = ins;
      onHeightCmChange(cmFromInches(ins));
    }
    paint();
  };

  const onFieldBlur = () => {
    setFocused(false);
    paint();
  };

  const displayCmStr = snapCm(heightCm).toFixed(1);
  const totalIn = Math.round(heightToDisplay(heightCm, "ft"));
  const ftSubtitle = formatFtIn(totalIn);
  const ariaValueText =
    heightUnit === "cm" ? `${displayCmStr} cm` : `${ftSubtitle} (${totalIn} in)`;

  return (
    <div
      className="overflow-hidden rounded-2xl border border-border-subtle bg-surface px-4 pb-5 pt-4 shadow-sm"
      role="slider"
      aria-valuemin={minV}
      aria-valuemax={maxV}
      aria-valuenow={heightUnit === "cm" ? Number(displayCmStr) : totalIn}
      aria-valuetext={ariaValueText}
      tabIndex={0}
      onKeyDown={(e) => {
        const step = heightUnit === "cm" ? CM_STEP : 1;
        displayRef.current = heightToDisplay(heightCm, heightUnit);
        const cur = displayRef.current;
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          displayRef.current = Math.max(minV, cur - step);
          onHeightCmChange(displayToHeightCm(displayRef.current, heightUnit));
          paint();
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          displayRef.current = Math.min(maxV, cur + step);
          onHeightCmChange(displayToHeightCm(displayRef.current, heightUnit));
          paint();
        } else if (e.key === "Home") {
          e.preventDefault();
          displayRef.current = minV;
          onHeightCmChange(displayToHeightCm(minV, heightUnit));
          paint();
        } else if (e.key === "End") {
          e.preventDefault();
          displayRef.current = maxV;
          onHeightCmChange(displayToHeightCm(maxV, heightUnit));
          paint();
        }
      }}
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-secondary-text">
          Height
        </span>
        <div
          className="inline-flex shrink-0 rounded-full bg-bg-light p-1"
          role="group"
          aria-label="Height unit"
        >
          {(
            [
              { id: "cm" as const, label: "CM" },
              { id: "ft" as const, label: "FT" },
            ] as const
          ).map((u) => {
            const on = heightUnit === u.id;
            return (
              <button
                key={u.id}
                type="button"
                onClick={() => onHeightUnitChange(u.id)}
                className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
                  on
                    ? "bg-[#1b3022] text-white shadow-sm"
                    : "text-[#5a6b62] hover:text-[#1b3022]"
                }`}
              >
                {u.label}
              </button>
            );
          })}
        </div>
      </div>

      <div
        className="mx-auto max-w-[330px] pt-2"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 118% 72% at 50% -8%, rgba(125,177,70,0.12) 0%, rgba(125,177,70,0.03) 45%, transparent 62%)",
        }}
      >
        <div className="overflow-hidden rounded-2xl border border-border-subtle bg-white shadow-[0_1px_0_rgba(27,48,34,0.04)]">
          <div className="relative isolate h-[60px] w-full shrink-0 overflow-hidden border-b border-border-subtle/60">
            <Image
              src={HEIGHT_FRAME_SRC}
              alt="Decorative height selector frame"
              fill
              className="pointer-events-none select-none object-cover object-top"
              sizes="330px"
              draggable={false}
              priority={false}
              aria-hidden
            />
          </div>
          <div
            ref={wrapRef}
            className="relative h-[180px] w-full touch-none select-none bg-gradient-to-b from-[#f6faf5] to-white"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            <canvas
              ref={canvasRef}
              className="absolute inset-0 block h-full w-full cursor-ew-resize"
            />
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center">
        <div className="flex flex-wrap items-baseline justify-center gap-2">
          <input
            type="text"
            inputMode="decimal"
            value={fieldText}
            onChange={(e) => onFieldChange(e.target.value)}
            onFocus={(e) => {
              setFocused(true);
              const d = heightToDisplay(heightCm, heightUnit);
              setDraft(
                heightUnit === "cm" ? snapCm(d).toFixed(1) : String(Math.round(d)),
              );
              requestAnimationFrame(() => e.target.select());
            }}
            onBlur={onFieldBlur}
            className="min-w-[5rem] max-w-[12rem] border-0 bg-transparent text-center text-4xl font-bold tabular-nums text-[#4CAF50] outline-none focus:ring-0 sm:text-5xl"
            aria-label="Height value"
          />
          <span className="pb-1 text-2xl font-bold text-[#4CAF50] sm:text-3xl">
            {heightUnit === "cm" ? "cm" : "in"}
          </span>
        </div>
        {heightUnit === "ft" ? (
          <p className="mt-1 text-sm font-medium text-secondary-text">{ftSubtitle}</p>
        ) : null}
      </div>
    </div>
  );
}
