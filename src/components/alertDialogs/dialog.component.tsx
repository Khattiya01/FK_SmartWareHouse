import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ReactNode } from "react";

type DialogComponentProps = {
  isOpen: boolean;
  className?: string;
  title?: ReactNode;
  description?: ReactNode;
  footer?: ReactNode;
  content?: ReactNode;
};
export function DialogComponent({
  isOpen,
  className,
  title,
  description,
  footer,
  content,
}: DialogComponentProps) {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className={`${className} AlertDialogContent`}>
        <AlertDialogHeader>
          <AlertDialogTitle className="AlertDialogTitle">
            <div className=" text-2xl">{title}</div>
          </AlertDialogTitle>
          <AlertDialogDescription className="AlertDialogDescription">{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex items-center">{content}</div>
        <AlertDialogFooter>
          {footer}
          {/* <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction> */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
