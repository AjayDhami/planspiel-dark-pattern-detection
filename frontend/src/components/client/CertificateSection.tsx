import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import { Website as WebsiteCertificationProps } from "../../types";
import { toast } from "react-toastify";

const CertificateSection = ({ websiteId }: WebsiteCertificationProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const generateCertificate = async () => {
    try {
      setIsLoading(true);
      // TODO implement generate certificate API here
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="subtitle1" component="p">
        Click on the button below to generate your certificate
      </Typography>
      <Button
        variant="contained"
        color="success"
        size="small"
        onClick={generateCertificate}
      >
        Generate Certificate
      </Button>
    </Box>
  );
};

export default CertificateSection;
