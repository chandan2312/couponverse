"use client";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useDispatch, useSelector } from "react-redux";
import { setPopup } from "../../store/slices/form.slice";

const Popup = ({
  trigger,
  header,
  footer,
  children,
  defaultOpen = true,
}: {
  trigger?: any;
  header?: any;
  footer?: any;
  children: any;
  defaultOpen?: boolean;
}) => {
  const dispatch = useDispatch();
  const popupState = useSelector((state: any) => state.form.popup);
  const sessionUser = useSelector((state: any) => state.user.sessionUser);

  function handleRegisterPopup(bool: boolean) {
    dispatch(setPopup(bool));
  }

  const defaultUsername = sessionUser?.name
    ?.toLowerCase()
    ?.replace(/\s/g, "_")
    ?.replace(/^[0-9]+/, "")
    ?.replace(/[^a-z0-9_]/g, "")
    ?.slice(0, 20)
    ?.trim();
  const defaultName = sessionUser?.name
    ?.replace(/^[0-9]+/, "")
    ?.replace(/[^a-zA-Z0-9_ ]/g, "")
    ?.slice(0, 20)
    ?.trim();
  const fallbackAvatar = "a";

  return (
    <AlertDialog defaultOpen={defaultOpen}>
      <AlertDialogTrigger>{trigger ? trigger : <></>}</AlertDialogTrigger>
      <AlertDialogContent className="max-h-full overflow-y-scroll">
        <AlertDialogHeader>{header ? header : <></>}</AlertDialogHeader>
        {children}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Popup;
