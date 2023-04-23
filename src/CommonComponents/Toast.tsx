import { Position, Toaster } from "@blueprintjs/core";

/** Singleton toaster instance. Create separate instances for different options. */
export const AppToaster = Toaster.create({
  className: "recipe-toaster",
  position: Position.TOP,
});

export const SuccessToaser = (messageToShow: string) => {
  return AppToaster.show({ message: messageToShow, intent: "success" });
};

export const ErrorToaser = (messageToShow: string) => {
    return AppToaster.show({ message: messageToShow, intent: "danger" });
  };
  
