import { Avatar, Button, Box, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { deepPurple } from "@mui/material/colors";
import { gql } from "@apollo/client";
import { useAuth } from "./useAuth";
import { useMutation, useQuery } from "@apollo/client/react";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "./header";
import FooterAirbnb from "./Footer";
import { useNavigate } from "react-router";
const FAV_QUERY = gql`
  query Favorites {
    favorites {
      id
      address
      amenities
      bathrooms
      bedrooms
      beds
      category
      createdAt
      description
      guests
      images
      title
      pricePerNight
    }
  }
`;

const SET_FAV_MUTATION = gql`
  mutation SetFav($listingId: ID!) {
    setFavorite(listingId: $listingId) {
      id
    }
  }
`;
const RemoveQuery = gql`
  mutation Mutation($listingId: ID!) {
    removeFavorite(listingId: $listingId) {
      id
    }
  }
`;
function Like() {
  const [removeFavorite] = useMutation(RemoveQuery);
  const navigate = useNavigate();
  const { accessToken, user } = useAuth();
  const { data, loading, error, refetch } = useQuery(FAV_QUERY);
  const [setFav] = useMutation(SET_FAV_MUTATION);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading favorites!</p>;
  return (
    <>
      <Header />
      <br />
      <hr />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          marginTop: "10px",
        }}
      >
        <Avatar sx={{ bgcolor: deepPurple[500] }}>
          {user?.name?.slice(0, 1)}
        </Avatar>

        <h1>{user?.name}</h1>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {data?.favorites?.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`/listings/${item.id}`)}
            style={{
              border: "1px solid #e0e0e0",
              borderRadius: "12px",
              padding: "12px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            }}
          >
            <div className="rasm">
              <Box
                sx={{ position: "relative", width: "100%", height: "200px" }}
              >
                {/* <Link
                  to={`/Listings/${item.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                > */}
                <img
                  src={
                    Array.isArray(item.images) ? item.images[0] : item.images
                  }
                  alt={item.title || "Listing Image"}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "8px",
                  }}
                />
                {/* </Link> */}
              </Box>
            </div>

            <div style={{ marginTop: "10px" }}>
              <h3 style={{ margin: "5px 0", fontSize: "1.1rem" }}>
                {item.title}
              </h3>
              <p style={{ margin: 0, fontWeight: "bold" }}>
                {item.pricePerNight}
              </p>
            </div>
            <br />

            <Button
              variant="outlined"
              startIcon={<DeleteIcon />}
              onClick={() => {
                removeFavorite({ variables: { listingId: item.id } });
                refetch();
              }}
            >
              delete
            </Button>
          </div>
        ))}
      </div>
      <br />
      <FooterAirbnb />
    </>
  );
}

export default Like;
