import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[270px] justify-start text-left font-normal"
        >
          <div
            className="w-4 h-4 rounded-full mr-2 border"
            style={{ backgroundColor: color }}
          />
          <span>{color}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[255px]">
        <div className="flex flex-wrap gap-1">
          {[
            "#FF0000",
            "#00FF00",
            "#0000FF",
            "#FFFF00",
            "#FF00FF",
            "#00FFFF",
            "#000000",
            "#FFFFFF",
          ].map((presetColor) => (
            <button
              key={presetColor}
              className="w-6 h-6 rounded-full border"
              style={{ backgroundColor: presetColor }}
              onClick={() => onChange(presetColor)}
            />
          ))}
        </div>
        <input
          type="color"
          value={color}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-8 mt-2"
        />
      </PopoverContent>
    </Popover>
  );
}
