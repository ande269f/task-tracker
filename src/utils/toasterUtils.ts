import { toaster } from "../components/ui/toaster";
import { generateRandomString } from "./arrayUtils";

export const createToasterOnErrorResponse = (
  response: any,
  toasterContext: string
) => {
  if (!response || response == null) return;
  if (response == "ERROR") {
    toaster.create({
      description: toasterContext,
      type: "error",
    });
  }
};

export const createToasterOnSuccessResponse = (
  response: any,
  toasterContext: string
) => {
  if (!response || response == null) return;
  if (response == "SUCCESS") {
    toaster.create({
      description: toasterContext,
      type: "success",
    });
  }
};

export const createToasterOnTimeout = (
  toasterContext: string,
  timeoutCount: number
) => {
  // Timeout er nået, og login er stadig ikke SUCCESS
  const timeoutId = setTimeout(() => {
    toaster.create({
      description: toasterContext,
      type: "warning", // kan være "warning" også
      duration: 5000,
    });
  }, timeoutCount);
  return timeoutId;
};

export const createToasterPending = (toasterContext: string) => {
  const id = generateRandomString(10)
  toaster.loading({
    id,
    description: toasterContext,
    type: "info",
  });

  return id;
};

export const updateToasterOnSuccess = (response: any, id: string, type: string, description: string) => {
    if (response !== "SUCCESS") return;
      toaster.update(id, {
      description: description,
      type: type
    })

}

export const updateToasterOnError = (response: any, id: string, type: string, description: string) => {
    if (response === "SUCCESS") return;
      toaster.update(id, {
      description: description,
      type: type
    })

}
