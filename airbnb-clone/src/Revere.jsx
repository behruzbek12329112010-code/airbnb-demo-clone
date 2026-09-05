import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import { useState } from "react";
import { useAuth } from "./useAuth";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { deepOrange, deepPurple } from "@mui/material/colors";
import { Link } from "react-router";
import SignUp from "./SignUp";
import "./Pages.css";
import FooterAirbnb from "./Footer";
import Header from "./header";
import { OrbitProgress } from "react-loading-indicators";

const BOOKEN = gql`
  query Bookings {
    bookings {
      checkIn
      checkOut
      createdAt
      guests
      id
      listing {
        id
        title
        pricePerNight
        location
        images
      }
      pricePerNight
      status
      totalNights
      totalPrice
    }
  }
`;

const AddFavorute = gql`
  mutation Mutation($listingId: ID!) {
    addFavorite(listingId: $listingId) {
      address
      bedrooms
      guests
      location
    }
  }
`;

function Listings() {
  const [page, setpage] = useState(1);
  const [search, setsearch] = useState("");
  const { accessToken, user } = useAuth();
  const { data, loading, error } = useQuery(BOOKEN, {
    variables: { limit: 6, page: page, search: search },
  });
  const [setFav] = useMutation(AddFavorute);
  const totalPages = data?.listings?.pagination?.totalPages;

  console.log(accessToken);

  return (
    <>
      <div>
        <Header search={search} setSearch={setsearch} />
      </div>

      <div>
        <br />

        {error && <Typography color="error">{error.message}</Typography>}
        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <OrbitProgress
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "100vh",
              }}
              color="black"
              size="medium"
              text=""
              textColor=""
            />
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {data?.bookings?.map((item) => (
            <div
              key={item?.listing?.id}
              style={{
                border: "1px solid #e0e0e0",
                borderRadius: "12px",
                padding: "12px",
                display: "flex",
                flexDirection: "column",
                justify: "space-between",
                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              }}
            >
              <div className="rasm">
                <Box
                  sx={{ position: "relative", width: "100%", height: "200px" }}
                >
                  <Link
                    to={`/Listings/${item?.listing?.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <img
                      src={
                        Array.isArray(item?.listing?.images)
                          ? item?.listing?.images[0]
                          : item?.listing?.images
                      }
                      alt={item?.listing?.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  </Link>

                  <IconButton
                    onClick={() =>
                      setFav({ variables: { listingId: item?.listing?.id } })
                    }
                    sx={{
                      position: "absolute",
                      top: 8,
                      backgroundColor: "white",
                      right: 8,
                      "&:hover": {
                        backgroundColor: "white",
                      },
                    }}
                  >
                    <FavoriteBorderIcon color="error" />
                  </IconButton>
                </Box>
              </div>

              <div style={{ marginTop: "10px" }}>
                <h3 style={{ margin: "5px 0", fontSize: "1.1rem" }}>
                  {item?.listing?.title}
                </h3>
                <p style={{ margin: 0, fontWeight: "bold" }}>
                  {item?.listing?.pricePerNight}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "20px", display: "flex", gap: "5px" }}>
          {new Array(totalPages).fill().map((_, index) => (
            <button key={index} onClick={() => setpage(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
        <Stack></Stack>
        <FooterAirbnb />
      </div>
    </>
  );
}

export default Listings;

// import { gql } from "@apollo/client";

// import { useMutation, useQuery } from "@apollo/client/react";
// import LocalOfferIcon from "@mui/icons-material/LocalOffer";
// import Rating from "@mui/material/Rating";

// import {
//   Box,
//   Button,
//   Card,
//   Container,
//   Dialog,
//   DialogActions,
//   DialogTitle,
//   Divider,
//   Grid,
//   IconButton,
//   ImageList,
//   ImageListItem,
//   InputLabel,
//   Paper,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { Link, useNavigate, useParams } from "react-router";
// import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
// import { Controller, useForm } from "react-hook-form";
// import StarIcon from "@mui/icons-material/Star";
// import { toast } from "react-toastify";
// import { useAuth } from "./useAuth";
// import { useState } from "react";
// import { detailBoxStyle } from "./Listings";

// const BOOKINGS = gql`
//   query Bookings {
//     bookings {
//       checkIn
//       checkOut
//       createdAt
//       guests
//       id
//       listing {
//         id
//       }
//       pricePerNight
//       status
//       totalNights
//       totalPrice
//     }
//   }
// `;

// function Reverse() {
//   const { control, handleSubmit } = useForm();
//   const [dialogOpen, setDialogOpen] = useState(false);
//   const { accessToken } = useAuth();

//   const { data, loading, error } = useQuery(BOOKINGS);

//   console.log(data);
//   const bookings = data?.bookings;
//   const navigate = useNavigate();

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       {loading && (
//         <Typography
//           variant="h5"
//           style={{ textAlign: "center", marginTop: "40px" }}
//         >
//           Loading . . .
//         </Typography>
//       )}

//       {error && (
//         <Typography
//           variant="body1"
//           color="error"
//           style={{ textAlign: "center", marginTop: "40px" }}
//         >
//           {error.message}
//         </Typography>
//       )}

//       {bookings && (
//         <Box key={bookings.id}>
//           <Typography variant="h4" fontWeight="bold" gutterBottom>
//             {bookings.title}
//           </Typography>

//           <Box
//             sx={{
//               display: "grid",
//               gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
//               gap: 1,
//               borderRadius: 4,
//               overflow: "hidden",
//               height: { xs: "300px", md: "450px" },
//               mb: 4,
//             }}
//           >
//             <Box sx={{ width: "100%", height: "100%" }}>
//               <img
//                 src={
//                   bookings?.images?.[0] ||
//                   "https://img.magnific.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?semt=ais_hybrid&w=740&q=80"
//                 }
//                 alt={bookings.title}
//                 style={{ width: "100%", height: "100%", objectFit: "cover" }}
//               />
//             </Box>
//             <Box
//               sx={{
//                 display: { xs: "none", md: "grid" },
//                 gridTemplateColumns: "1fr 1fr",
//                 gridTemplateRows: "1fr 1fr",
//                 gap: 1,
//                 height: "100%",
//               }}
//             >
//               {bookings?.images?.slice(1, 5).map((img, index) => (
//                 <img
//                   key={index}
//                   src={img}
//                   alt={`img-${index}`}
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     objectFit: "cover",
//                   }}
//                 />
//               ))}
//             </Box>
//           </Box>

//           <Grid container spacing={4}>
//             <Grid item xs={12} md={8}>
//               <Typography variant="h5" fontWeight="600" gutterBottom>
//                 Entire rental unit in {bookings.location}, {bookings.address}
//               </Typography>

//               <Box
//                 sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}
//               >
//                 <Typography
//                   variant="h6"
//                   color="success.main"
//                   sx={{ display: "flex", alignItems: "center" }}
//                 >
//                   {bookings?.rating} <StarIcon sx={{ ml: 0.5 }} />
//                 </Typography>
//                 <Typography variant="body1" color="text.secondary">
//                   ({bookings?.reviewsCount} reviews)
//                 </Typography>
//               </Box>

//               <Divider sx={{ my: 3 }} />

//               <Box
//                 sx={{
//                   display: "grid",
//                   gridTemplateColumns: "1fr 1fr",
//                   gap: 2,
//                 }}
//               >
//                 <div style={detailBoxStyle}>
//                   <b>amenities:</b> {bookings?.amenities}
//                 </div>
//                 <div style={detailBoxStyle}>
//                   <b>guests:</b> {bookings?.guests}
//                 </div>
//                 <div style={detailBoxStyle}>
//                   <b>bedrooms:</b> {bookings?.bedrooms}
//                 </div>
//                 <div style={detailBoxStyle}>
//                   <b>beds:</b> {bookings?.beds}{" "}
//                 </div>
//                 <div style={detailBoxStyle}>
//                   <b>bathrooms:</b> {bookings?.bathrooms}
//                 </div>
//                 <div style={detailBoxStyle}>
//                   <b>address:</b> {bookings?.address}
//                 </div>
//                 <div style={detailBoxStyle}>
//                   <b>location:</b> {bookings?.location}
//                 </div>
//               </Box>

//               <Divider sx={{ my: 3 }} />

//               <Typography variant="h6" fontWeight="bold">
//                 About this space
//               </Typography>
//               <Typography variant="body1" paragraph mt={1}>
//                 {bookings?.description}
//               </Typography>
//             </Grid>

//             {/* <Grid item xs={12} md={4}>
//               <Card
//                 elevation={4}
//                 sx={{
//                   p: 3,
//                   borderRadius: 3,
//                   border: "1px solid #e0e0e0",
//                   position: "sticky",
//                   top: 24,
//                 }}
//               >
//                 <Typography variant="h5" fontWeight="bold" mb={2}>
//                   ${bookings?.pricePerNight}{" "}
//                   <Typography
//                     component="span"
//                     variant="body1"
//                     color="text.secondary"
//                   >
//                     / night
//                   </Typography>
//                 </Typography>

//                 <Typography
//                   variant="body2"
//                   textAlign="center"
//                   color="text.secondary"
//                   mt={2}
//                 >
//                   You won't be charged yet
//                 </Typography>
//               </Card>
//             </Grid> */}
//           </Grid>
//         </Box>
//       )}
//     </Container>
//   );
// }
// export default Reverse;
