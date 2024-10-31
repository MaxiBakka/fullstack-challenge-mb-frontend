"use client";

import React, { ChangeEvent, forwardRef } from "react";
import {
  Controller,
  ControllerProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { cn } from "../../../../utils/class-merger";

type TextInputProps = {
  label: string;
  type?: string;
  autoFocus?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  error?: string;
  testId?: string;
  autoComplete?: string;
  inputComponent?: React.ElementType;
  multiline?: boolean;
  minRows?: number;
  maxRows?: number;
  size?: "small" | "medium";
};

const TextInput = forwardRef<
  HTMLDivElement | null,
  TextInputProps & {
    name: string;
    value: string;
    onChange: (
      value: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    onBlur: () => void;
  }
>(function TextInput(props, ref) {
  const InputComponent = props.inputComponent || "input";
  const sizeClasses =
    props.size === "small" ? "py-1 px-2 text-sm" : "py-2 px-3";

  return (
    <div ref={ref} className="w-full">
      <label
        htmlFor={props.name}
        className={cn(
          "block text-sm text-left font-medium mb-1",
          props.error ? "text-red-500" : "text-gray-700",
          props.disabled && "opacity-50"
        )}
      >
        {props.label}
      </label>
      <InputComponent
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        type={props.type}
        autoFocus={props.autoFocus}
        disabled={props.disabled}
        readOnly={props.readOnly}
        autoComplete={props.autoComplete}
        data-testid={props.testId}
        className={cn(
          "w-full rounded-md border transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-offset-1",
          sizeClasses,
          props.error
            ? "border-red-300 focus:border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:border-blue-500 focus:ring-blue-500",
          props.disabled && "bg-gray-50 opacity-50 cursor-not-allowed",
          props.readOnly && "bg-gray-50 cursor-default"
        )}
      />
      {props.error && (
        <p
          className="mt-1 text-sm text-red-500"
          data-testid={`${props.testId}-error`}
        >
          {props.error}
        </p>
      )}
    </div>
  );
});

function FormTextInput<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: Pick<ControllerProps<TFieldValues, TName>, "name" | "defaultValue"> &
    TextInputProps
) {
  return (
    <Controller
      name={props.name}
      defaultValue={props.defaultValue}
      render={({ field, fieldState }) => (
        <TextInput
          {...field}
          label={props.label}
          autoFocus={props.autoFocus}
          type={props.type}
          error={fieldState.error?.message}
          disabled={props.disabled}
          readOnly={props.readOnly}
          testId={props.testId}
          multiline={props.multiline}
          minRows={props.minRows}
          maxRows={props.maxRows}
          inputComponent={props.inputComponent}
          size={props.size}
        />
      )}
    />
  );
}

export default FormTextInput;
