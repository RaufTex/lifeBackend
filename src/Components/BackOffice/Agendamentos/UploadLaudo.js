import React, { useState, useEffect } from "react";
import { useUsersContext } from "../../../Context/UserContext";
import * as AWS from "aws-sdk";
import {
  TextField,
  Grid,
  Button,
  Box,
  Typography,
  Modal,
  Card,
  CardContent,
} from "@mui/material";
require("dotenv").config({ path: require("find-config")(".env") });

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function UploadLaudo() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { handleModalUpload, openModalUpload, rowStatus } = useUsersContext();
  const [formValues, setFormValues] = useState(null);


  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    /* updateData(); */
    /*  createTable(); */
    /* deleteItem(); */
    /* getAddress(); */
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(e.target.files);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    uploadLaudo(formValues, rowStatus);
    setRefresh(true);
  };

  function uploadLaudo(formValues, rowStatus) {
    /* const files = document.getElementById("file"); */
    alert("Aguarde, processando arquivo!!");
    console.log(rowStatus);
    const files = formValues[0];
    console.log(files)
    let awsConfig2 = {
      region: process.env.REACT_APP_LOCATION_KEY,
      accessKeyId: process.env.REACT_APP_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_SECRET_KEY,
    };

    AWS.config.update(awsConfig2);

    const s3 = new AWS.S3();

    const upload = async (body) => {
      console.log(files)
      const params = {
        ACL: "public-read",
        Body: body,
        ContentType: "application/pdf",
        Bucket:
          `udnas3prd-prd/public/Reports/${rowStatus.cpf}/Laudos Genéticos`,
        Key: body.name,
      };
      console.log(params);

      return await new Promise((resolve, reject) => {
        s3.putObject(params, (err, results) => {
          if (err) console.log(err);
          else alert("Laudo enviado com Sucesso!!");
        });
      });
    };

    upload(files);
  }

  return (
    <div>
      
      <Modal
        open={openModalUpload}
        onClose={() => handleModalUpload(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <Grid
              container
              alignItems="center"
              justify="center"
              direction="column"
              spacing={2}
              marginTop={2}
            >
              <Grid item>
                <TextField
                  id="laudo-input"
                  name="laudo"
                  type="file"
                  hiddenLabel
                  variant="filled"
                  /* value={formValues} */
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            <Button
              sx={{
                marginLeft: "35%",
                marginTop: "10%",
                width: "84px",
                height: "37px",
                background: "rgba(116, 76, 182, 0.19)",
                borderRadius: "5px",
                fontSize: "10px",
                color: "#744CB6",
                fontStyle: "normal",
                fontWeight: "normal",
                lineHeight: "19px",
              }}
              variant="contained"
              color="primary"
              type="submit"
            >
              Upload
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}