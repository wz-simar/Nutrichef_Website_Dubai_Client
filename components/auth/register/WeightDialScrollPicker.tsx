"use client";

import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { kgToLb, lbToKg } from "@/lib/registerApiMapping";

const WEIGHT_FRAME_SRC = "/weight_selector_container.png";

const KG_MIN = 40;
const KG_MAX = 160;
const KG_STEP = 0.5;
const LB_MIN = 90;
const LB_MAX = 350;
const DRAG_SENS = 15;
const VISIBLE_RANGE = 20;

export type WeightDialScrollPickerProps = {
  weightKg: number;
  weightUnit: "kg" | "lb";
  onWeightKgChange: (weightKg: number) => void;
  onWeightUnitChange: (unit: "kg" | "lb") => void;
};

function snapKgDisplay(v: number): number {
  return Math.round(v * 2) / 2;
}

function weightToDisplay(weightKg: number, unit: "kg" | "lb"): number {
  if (unit === "kg") {
    return Math.min(KG_MAX, Math.max(KG_MIN, snapKgDisplay(weightKg)));
  }
  return Math.min(LB_MAX, Math.max(LB_MIN, Math.round(kgToLb(weightKg))));
}

function displayToWeightKg(display: number, unit: "kg" | "lb"): number {
  if (unit === "kg") return snapKgDisplay(display);
  return lbToKg(Math.round(display));
}

function drawCurvedGauge(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  currentValue: number,
  minV: number,
  maxV: number,
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
        ctx.save();
        ctx.translate(Math.round(tx * 10) / 10, Math.round(ty * 10) / 10);
        ctx.rotate(angleRad + Math.PI / 2);
        ctx.fillStyle = `rgba(90, 107, 98, ${opacity})`;
        ctx.font = `600 ${labelPx}px ui-sans-serif, system-ui, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(String(i), 0, 0);
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

export function WeightDialScrollPicker({
  weightKg,
  weightUnit,
  onWeightKgChange,
  onWeightUnitChange,
}: WeightDialScrollPickerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const displayRef = useRef(weightToDisplay(weightKg, weightUnit));
  const [draft, setDraft] = useState("");
  const [focused, setFocused] = useState(false);

  const minV = weightUnit === "kg" ? KG_MIN : LB_MIN;
  const maxV = weightUnit === "kg" ? KG_MAX : LB_MAX;

  const committedDisplay = weightToDisplay(weightKg, weightUnit);
  const fieldText = focused
    ? draft
    : weightUnit === "kg"
      ? snapKgDisplay(committedDisplay).toFixed(1)
      : String(Math.round(committedDisplay));

  useEffect(() => {
    if (!draggingRef.current) {
      displayRef.current = weightToDisplay(weightKg, weightUnit);
    }
  }, [weightKg, weightUnit]);

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
    drawCurvedGauge(ctx, displayW, displayH, displayRef.current, minV, maxV);
  }, [minV, maxV]);

  useLayoutEffect(() => {
    paint();
  }, [paint, weightKg, weightUnit, fieldText]);

  useEffect(() => {
    const ro = new ResizeObserver(() => paint());
    if (wrapRef.current) ro.observe(wrapRef.current);
    return () => ro.disconnect();
  }, [paint]);

  const endDrag = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    if (weightUnit === "kg") {
      displayRef.current = snapKgDisplay(displayRef.current);
    } else {
      displayRef.current = Math.round(displayRef.current);
    }
    displayRef.current = Math.min(maxV, Math.max(minV, displayRef.current));
    onWeightKgChange(displayToWeightKg(displayRef.current, weightUnit));
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
    onWeightKgChange(displayToWeightKg(displayRef.current, weightUnit));
    if (focused) {
      if (weightUnit === "kg") setDraft(snapKgDisplay(displayRef.current).toFixed(1));
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
    if (weightUnit === "kg") {
      if (n < KG_MIN || n > KG_MAX) return;
      displayRef.current = n;
      onWeightKgChange(snapKgDisplay(n));
    } else {
      if (n < LB_MIN || n > LB_MAX) return;
      displayRef.current = n;
      onWeightKgChange(lbToKg(Math.round(n)));
    }
    paint();
  };

  const onFieldBlur = () => {
    setFocused(false);
    paint();
  };

  const displayKgStr = (Math.round(weightKg * 10) / 10).toFixed(1);
  const displayLbStr = kgToLb(weightKg).toFixed(1);
  const ariaValueText = `${weightUnit === "kg" ? displayKgStr : displayLbStr} ${weightUnit === "kg" ? "kg" : "lb"}`;

  return (
    <div
      className="overflow-hidden rounded-2xl border border-border-subtle bg-surface px-4 pb-5 pt-4 shadow-sm"
      role="slider"
      aria-valuemin={minV}
      aria-valuemax={maxV}
      aria-valuenow={weightUnit === "kg" ? Number(displayKgStr) : Number(displayLbStr)}
      aria-valuetext={ariaValueText}
      tabIndex={0}
      onKeyDown={(e) => {
        const step = weightUnit === "kg" ? KG_STEP : 1;
        displayRef.current = weightToDisplay(weightKg, weightUnit);
        const cur = displayRef.current;
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          displayRef.current = Math.max(minV, cur - step);
          onWeightKgChange(displayToWeightKg(displayRef.current, weightUnit));
          paint();
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          displayRef.current = Math.min(maxV, cur + step);
          onWeightKgChange(displayToWeightKg(displayRef.current, weightUnit));
          paint();
        } else if (e.key === "Home") {
          e.preventDefault();
          displayRef.current = minV;
          onWeightKgChange(displayToWeightKg(minV, weightUnit));
          paint();
        } else if (e.key === "End") {
          e.preventDefault();
          displayRef.current = maxV;
          onWeightKgChange(displayToWeightKg(maxV, weightUnit));
          paint();
        }
      }}
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-secondary-text">
          Weight
        </span>
        <div
          className="inline-flex shrink-0 rounded-full bg-bg-light p-1"
          role="group"
          aria-label="Weight unit"
        >
          {(
            [
              { id: "kg" as const, label: "KG" },
              { id: "lb" as const, label: "LB" },
            ] as const
          ).map((u) => {
            const on = weightUnit === u.id;
            return (
              <button
                key={u.id}
                type="button"
                onClick={() => onWeightUnitChange(u.id)}
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
              src={WEIGHT_FRAME_SRC}
              alt="Decorative weight selector frame"
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

      <div className="mt-6 flex flex-wrap items-baseline justify-center gap-2">
        <input
          type="text"
          inputMode="decimal"
          value={fieldText}
          onChange={(e) => onFieldChange(e.target.value)}
          onFocus={(e) => {
            setFocused(true);
            const d = weightToDisplay(weightKg, weightUnit);
            setDraft(
              weightUnit === "kg" ? snapKgDisplay(d).toFixed(1) : String(Math.round(d)),
            );
            requestAnimationFrame(() => e.target.select());
          }}
          onBlur={onFieldBlur}
          className="min-w-[5rem] max-w-[12rem] border-0 bg-transparent text-center text-4xl font-bold tabular-nums text-[#4CAF50] outline-none focus:ring-0 sm:text-5xl"
          aria-label="Weight value"
        />
        <span className="pb-1 text-2xl font-bold text-[#4CAF50] sm:text-3xl">
          {weightUnit === "kg" ? "kg" : "lb"}
        </span>
      </div>
    </div>
  );
}
