import React from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { buyItems, loadArticles, clearCart } from "../../redux/actions";
import { Button, Input, List, ListItem } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";

import HouseIcon from "@mui/icons-material/House";
import ContactMailIcon from "@mui/icons-material/ContactMail";

export default function ConfirmOrder() {
  const navigate = useNavigate();
  const location = useLocation();
  const { items } = location.state || {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    // data.email and data.adress are the values from the form
    buyItems(items, data.email, data.adress);

    setTimeout(() => {
      dispatch(loadArticles());
      dispatch(clearCart());
    }, 350);

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexGrow: 1,
      }}
    >
      <h1>Confirm Order</h1>
      {items ? (
        <Box sx={{ width: "70%", textAlign: "center" }}>
          <List>
            {items.map((item) => (
              <ListItem
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  fontSize: "20px",
                  color: "#000",
                }}
                key={item.id}
              >
                {item.name} - Quantity: {item.quantity} - Price:{" "}
                {item.price * item.quantity}$
              </ListItem>
            ))}
          </List>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={boxStyle}>
              <Input
                sx={{ width: "100%" }}
                {...register("email", { required: "Email is required" })}
                placeholder="Email"
                type="email"
              />
              <ContactMailIcon></ContactMailIcon>
            </Box>
            {errors.email && <p>{errors.email.message}</p>}
            <Box sx={boxStyle}>
              <Input
                sx={{ width: "100%" }}
                {...register("adress", { required: "Adress is required" })}
                placeholder="Address"
                type="text"
              />
              <HouseIcon></HouseIcon>
            </Box>
            <Button sx={{ width: "100%" }} type="submit">
              Buy
            </Button>
          </form>
        </Box>
      ) : (
        <p>No items to confirm</p>
      )}
    </Box>
  );
}

const boxStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "4px",
};
