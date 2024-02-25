import React, { useMemo, useRef, useState } from "react";
import { Website } from "../../types";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { ContentCopy as CopyIcon } from "@mui/icons-material";
import { toast } from "react-toastify";
import { generateCertification } from "../../api";

const CertificateSection = ({ websiteId, certificationId }: Website) => {
  const scriptTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  const [loading, setLoading] = useState<boolean>(false);
  const [certificate, setCertificate] = useState<string>(certificationId);
  const [copySuccess, setCopySuccess] = useState<boolean>(false);

  const certificateScript = useMemo(
    () => `<div style="display:flex;justify-content:space-between;align-items:center;padding:0 1rem;background:inherit;color:inherit;font-family: Arial;">
  <div>
    <p style="font-size:1rem;padding:0">This Website is Dark Pattern Free</p>
    <p style="font-size:0.9rem;">Certificate ID: ${certificate}</p>
  </div>
  <div style="font-size:1rem;">
    <p>Certified by <a href="https://v-tenet.vercel.app/" target="_blank" style="text-decoration: underline; color: inherit;">V-TENET</a></p>
  </div>
</div>`,
    [certificate]
  );

  const copyToClipboard = () => {
    if (scriptTextareaRef.current) {
      scriptTextareaRef.current.select();
      document.execCommand("copy");
      setCopySuccess(true);

      setTimeout(() => {
        setCopySuccess(false);
      }, 1000);
    }
  };

  const generateCertificate = async () => {
    try {
      setLoading(true);

      const response = await generateCertification(websiteId);
      setCertificate(response.certificationId);

      toast.success("Your Certificate has been generated!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack>
      <Typography variant="h6" component="h6" color="primary">
        Website Certification
      </Typography>

      {!certificate && (
        <Stack
          spacing={1}
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="center"
          textAlign="center"
        >
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Click on the button to generate your certificate
          </Typography>
          <Button
            variant="contained"
            onClick={generateCertificate}
            disabled={loading}
          >
            Generate Certificate
          </Button>
        </Stack>
      )}

      {certificate && (
        <>
          <Typography variant="body1" component="h6">
            The Certificate for your Website has been generated. Follow the
            steps below to add the certificate to your website.
          </Typography>
          <Box
            sx={{
              mt: 2,
              direction: "ltr",
              position: "relative",
              fontSize: "12px",
              border: "1px solid rgb(229, 234, 242)",
              borderRadius: "12px",
            }}
          >
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{
                px: 1,
                backgroundColor: "rgba(243, 246, 249, 0.2)",
              }}
            >
              <Typography
                variant="body2"
                component="span"
                color="primary"
                ml={1}
              >
                Your Certificate
              </Typography>
              <Tooltip
                title={copySuccess ? "Copied!" : "Copy Certificate"}
                placement="left"
              >
                <IconButton
                  aria-label="copy-certificate"
                  size="small"
                  onClick={copyToClipboard}
                >
                  <CopyIcon sx={{ width: 18, hright: 18 }} />
                </IconButton>
              </Tooltip>
            </Stack>
            <pre
              style={{
                lineHeight: 1.5,
                margin: "auto",
                padding: "16px",
                backgroundColor: "#0F1924",
                color: "#f8f8f2",
                overflowX: "auto",
                borderRadius: "0 0 12px 12px",
              }}
            >
              <code>{certificateScript}</code>
            </pre>
            <textarea
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: -1,
              }}
              ref={scriptTextareaRef}
              readOnly
              value={certificateScript}
            />
          </Box>

          <Stack mt={2} gap={1}>
            <Typography variant="body1" component="p">
              1. Click on copy button{" "}
              <CopyIcon sx={{ width: 18, hright: 18 }} /> to copy the
              certificate
            </Typography>
            <Typography variant="body1" component="p">
              2. Paste it in your website's footer
            </Typography>
            <Typography variant="body1" component="p">
              3. Voila! You can now scream to the world that your website is
              free from Dark patterns.
            </Typography>
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default CertificateSection;
