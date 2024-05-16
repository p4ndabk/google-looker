import * as React from "react";

import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";

const Input = React.forwardRef(({ className, type, error, ...props }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  return (
    <div className="relative">
      <input
        type={type !== "password" || showPassword ? "text" : "password"}
        className={cn(
          `flex h-10 w-full rounded-md border ${
            error ? "border-destructive" : "border-input"
          } bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`,
          className
        )}
        ref={ref}
        {...props}
      />
      {type === "password" && (
        <div className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-gray-400">
          {showPassword ? (
            <Icon
              icon="streamline:visible-solid"
              className="h-4 w-4"
              onClick={togglePasswordVisibility}
            />
          ) : (
            <Icon
              icon="streamline:invisible-1-solid"
              className="h-4 w-4"
              onClick={togglePasswordVisibility}
            />
          )}
        </div>
      )}
    </div>
  );
});
Input.displayName = "Input";

export { Input };
