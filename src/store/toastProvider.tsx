import * as React from "react";
import * as Toast from "@radix-ui/react-toast";
import useToastStore, { typeStatusTaost } from "@/hooks/useToastStore";
import "./styles.css";
import { IoMdClose } from "react-icons/io";

const ToastProvider: React.FC = () => {
  const { open, title, message, hide, status } = useToastStore();

  return (
    <Toast.Provider swipeDirection="up">
      <Toast.Root
        className={`  ${
          status === typeStatusTaost.success ? "ToastRoot" : "ToastRoot-error"
        } `}
        open={open}
        onOpenChange={hide}
      >
        <Toast.Title className="ToastTitle">
          <div>{title}</div>
        </Toast.Title>
        <Toast.Description asChild>
          {/* <time className="ToastDescription" dateTime={eventDate.toISOString()}>
            {prettyDate(eventDate)}
          </time> */}
          <div>{message}</div>
        </Toast.Description>
        <Toast.Action
          className="ToastAction cursor-pointer"
          asChild
          altText="Undo action"
        >
          <IoMdClose />
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="ToastViewport" />
    </Toast.Provider>
  );
};

export default ToastProvider;
