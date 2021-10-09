import { useState, useEffect } from "react";
import "./HomePage.css";
import axios from "axios";
import TableComponent from "../../component/TableComponent/table.component";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Typography, TextField, Grid, Button } from "@material-ui/core";

import { AddCircleOutlined, CloudUpload } from "@material-ui/icons";

import {toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  align: "center",
  width: "40%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 18,
  p: 3,
};

const HomePage = () => {
  //User Data states
  const [data, setData] = useState([]);

  //Modal States and functions
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    // console.log("i am opened");
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  //Add user functions  and states
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");

  const submitData = async () => {
    if (!name || !username || !email || !phone || !website) {
      toast.error("Please Enter All The details", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    await axios
      .post("https://jsonplaceholder.typicode.com/users", {
        name: name,
        username: username,
        email: email,
        phone: phone,
        website: website,
      })
      .then((res) => {
        console.log(res.data);
        setData([...data, res.data]);
        toast.success("User Added Successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await submitData();

    setOpen(false);
  };

  //get user Row and delete
  const [selectionModel, setSelectionModel] = useState([]);

  // console.log("Accessed User ROw", selectionModel);

  const Delete = async () => {
    if (selectionModel.length === 0) {
      toast.error("No User Selected to Delete", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    } else if (selectionModel.length > 1) {
      toast.error("Cannot Delete Multiple Users At the same time", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    await axios
      .delete(`https://jsonplaceholder.typicode.com/users/${selectionModel[0]}`)
      .then((res) => {
        console.log("Deleted Data", res);
        // selectionModel.map((indice ) => setData(data.filter((item) => (item.id !== indice))));
        setData(data.filter((item) => item.id !== selectionModel[0]));
        toast.success("User Deleted Successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
        // data.filter((item) => (console.log("THi is fjda;flksjadflafldkjs",item.id)));
      })
      .catch((err) => console.log(err));
  };

  //get user row-- edit and update user
  const [editflag, setEditFlag] = useState(0);

  const edit = async () => {
    await axios
      .get(`https://jsonplaceholder.typicode.com/users/${selectionModel[0]}`)
      .then((res) => {
        // console.log("This is the data to be edited", res.data);
        // console.log("perform edition on this data", data);
        setName(res.data.name);
        setUsername(res.data.username);
        setEmail(res.data.email);
        setPhone(res.data.phone);
        setWebsite(res.data.website);
      })
      .catch((err) => console.log(err));
  };

  const handleOpen1 = async () => {
    if (selectionModel.length === 0) {
      toast.error("No User Selected to be Edited", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    } else if (selectionModel.length > 1) {
      toast.error("Cannot Edit Multiple Users At the same time", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    console.log("i am opened");
    await edit();
    setEditFlag(editflag + 1);
    setOpen(true);
  };

  const handleClose1 = () => {
    setEditFlag(editflag - 1);
    setOpen(false);
  };

  const Update = async () => {
    if (selectionModel.length === 0) {
      toast.error("No User Selected to Update", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    } else if (selectionModel.length > 1) {
      toast.error("Cannot Update Multiple Users At the same time", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    } else if (!name || !username || !email || !phone || !website) {
      toast.error("Please Enter All The details", {
        position: toast.POSITION.TOP_CENTER,
      });
      return;
    }

    await axios
      .put(`https://jsonplaceholder.typicode.com/users/${selectionModel[0]}`, {
        name: name,
        username: username,
        email: email,
        phone: phone,
        website: website,
      })
      .then((res) => {
        // console.log("Updated Data", res);
        setData([...data, res.data]);
        toast.success("User Updated Successfully", {
          position: toast.POSITION.TOP_CENTER,
        });
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    await Update();
    setEditFlag(editflag - 1);
    setOpen(false);
  };

  //Get Data from JSON PLACEHOLDER API AND SET DATA ON EVERY CHANGE
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((res) => {
          setData(res.data);
        //   console.log("THis is the result from endpoint ====>>>>", res.data);
        //   console.log("THis is the data now", data);
        })
        .catch((err) => console.log(err));
    };

    fetchData();
  }, [setData]);

  return (
    <div className="container-fluid HomePage">
      <div className="row">
        <div className="col">
          <TableComponent
            data={data}
            selectionModel={selectionModel}
            setSelectionModel={setSelectionModel}
          />
        </div>
      </div>
      <div className="col  edit-modal">
        <div className="row check" style={{ marginLeft: "20%" }}>
          <div className="col-lg-2 col-md-3 col-sm-3 check1">
            <Button
              color="primary"
              variant="contained"
              className=""
              type="submit"
              onClick={handleOpen}
            >
              Add User
            </Button>
          </div>

          <div className="col-lg-3 col-md-3 col-sm-3 check2">
            <Button  variant="contained" type="submit" onClick={Delete}>
              Delete Selected User
            </Button>
          </div>

          <div className="col-lg-3 col-md-3 col-sm-3 check2">
            <Button variant="contained" type="submit" onClick={handleOpen1}>
              Edit Selected User
            </Button>
          </div>
        </div>

        <Modal
          open={open}
          onClose={editflag === 1 ? handleClose1 : handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              className="mb-3"
              id="modal-modal-title"
              variant="h6"
              component="h2"
            >
              Please Fill In the User Details
            </Typography>

            <Grid
              container
              rowSpacing={2}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item className="mb-3" xs={6}>
                <TextField
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  label="name"
                  variant="outlined"
                />
              </Grid>
              <Grid item className="mb-3" xs={6}>
                <TextField
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  id="username"
                  label="username"
                  variant="outlined"
                />
              </Grid>
              <Grid item className="mb-3" xs={6}>
                <TextField
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  label="email"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  id="phone"
                  label="phone"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  id="website"
                  label="website"
                  variant="outlined"
                />
              </Grid>
            </Grid>

            {editflag === 1 ? (
              <Button
                type="submit"
                variant="outlined"
                onClick={(e) => handleSubmit1(e)}
                style={{ marginLeft: "40%", marginTop: "2%" }}
              >
                <CloudUpload /> Update User
              </Button>
            ) : (
              <Button
                type="submit"
                variant="outlined"
                onClick={(e) => handleSubmit(e)}
                style={{ marginLeft: "40%", marginTop: "2%" }}
              >
                <AddCircleOutlined /> Add User
              </Button>
            )}
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default HomePage;
