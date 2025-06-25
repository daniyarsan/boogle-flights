import React, { useEffect, useState } from "react";

interface CaptchaFrameProps {
  base64Page: string;
  onSolved?: () => void;
}

const CaptchaFrame: React.FC<CaptchaFrameProps> = ({
  base64Page,
  onSolved,
}) => {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const html = atob(base64Page); // Decode base64
    const blob = new Blob([html], { type: "text/html" });
    const objUrl = URL.createObjectURL(blob);
    setUrl(objUrl);

    return () => {
      URL.revokeObjectURL(objUrl);
    };
  }, [base64Page]);

  return url ? (
    <iframe
      src={url}
      width="100%"
      height="700px"
      sandbox="allow-scripts allow-forms allow-same-origin allow-top-navigation"
      style={{ border: "none", borderRadius: "8px" }}
    />
  ) : (
    <p>Loading CAPTCHA…</p>
  );
};

export default CaptchaFrame;
