import {
  CheckCircledIcon,
  Cross2Icon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
} from "@radix-ui/react-icons";
import { Callout } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import "./style.css";

type NotificationProps = {
  type: "success" | "info" | "warning" | "error";
  text: string;
  closeNotification: () => void;
};

export default function Notification({
  type,
  text,
  closeNotification,
}: NotificationProps) {
  const options = {
    success: { icon: <CheckCircledIcon />, color: "jade" },
    info: { icon: <InfoCircledIcon />, color: "blue" },
    warning: { icon: <ExclamationTriangleIcon />, color: "amber" },
    error: { icon: <ExclamationTriangleIcon />, color: "tomato" },
  };

  const [showClosingAnimation, setShowClosingAnimation] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowClosingAnimation(true), 3000);
    setTimeout(closeNotification, 3099);
  });

  function close() {
    setShowClosingAnimation(true);
    setTimeout(closeNotification, 100);
  }

  return (
    <Callout.Root
      style={{
        position: "fixed",
        bottom: "4%",
        right: "4%",
        zIndex: "9",
      }}
      color={options[type].color as "jade" | "amber" | "blue" | "tomato"}
      data-state={showClosingAnimation ? "closed" : "open"}
      className="NotificationRoot"
    >
      <Callout.Icon>{options[type].icon}</Callout.Icon>
      <Callout.Text style={{ display: "flex", alignItems: "center" }}>
        {text}
        <Cross2Icon
          style={{
            cursor: "pointer",
            width: "20px",
            height: "20px",
            marginLeft: "1rem",
          }}
          onClick={close}
        />
      </Callout.Text>
    </Callout.Root>
  );
}
