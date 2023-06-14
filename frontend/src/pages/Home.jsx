import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  HStack,
  Heading,
  Select,
  Skeleton,
  Stack,
  VStack,
} from "@chakra-ui/react";

const Home = () => {
  // Get all sheet data from server and show in UI
  const [data, setData] = useState([]); // State to store sheet data

  const [loading, setLoading] = useState(false); // State to track loading status
  const [bookeddata, setBookedData] = useState([]); // State to show booked data
  const [error, setError] = useState(false); // State to track error status

  const [ticketQty, setTicket] = useState(0); // State to track selected ticket quantity

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://drab-plum-cockatoo-tutu.cyclic.app/allsheet") // Fetch sheet data from server
      .then((res) => {
        setData(res.data); // Store fetched data in state
        setLoading(false); // Loading complete
      })
      .catch((e) => setError(true)); // Handle error if any
  }, [bookeddata]);

  const handleButtonClick = () => {
    setLoading(true);
    axios
      .post("https://drab-plum-cockatoo-tutu.cyclic.app/bookticket", {
        numberOfTickets: ticketQty,
      })
      .then((res) => setBookedData(res.data.tickets))
      .catch((e) => console.log(e));
    setTicket(0);
  };
  console.log(bookeddata, "dataBooked");
  return (
    <>
      <Box>
        <Heading size={"xl"} m="5" textAlign={"center"}>
          Traing Ticket Booking App
        </Heading>
      </Box>
      {loading ? (
        // If loading, show skeleton placeholders
        <Stack w="80%" m="auto">
          <Skeleton height="100px" />
          <Skeleton height="100px" />
          <Skeleton height="100px" />
          <Skeleton height="100px" />
          <Skeleton height="100px" />
        </Stack>
      ) : (
        // If not loading, render sheet buttons
        <Box
          w={{ sm: "95%", lg: "80%" }}
          m="auto"
          display={"grid"}
          gridTemplateColumns={"repeat(7,1fr)"}
          gap={"2.5"}
        >
          {data.length > 0 &&
            data.map((e) => {
              if (!e.isBooked) {
                return (
                  <Button colorScheme="whatsapp" size={"sm"} key={e._id}>
                    {e.sheetNumber}
                  </Button>
                );
              } else {
                return (
                  <Button colorScheme="red" size={"sm"} key={e._id}>
                    {e.sheetNumber}
                  </Button>
                );
              }
            })}
        </Box>
      )}
      {bookeddata.length > 0 && (
        <HStack w={{ sm: "80%", lg: "50%" }} m="auto" mt="2">
          <Box>Your booked sheet are:</Box>
          {bookeddata &&
            bookeddata.map((e) => <Button key={e.sheet}>{e.sheet}</Button>)}
        </HStack>
      )}
      <HStack w={{ sm: "80%", lg: "50%" }} m="auto" mt="5">
        {/* Select component to choose the number of tickets */}
        <Select
          m="auto"
          colorScheme="facebook"
          placeholder="Select number of ticket you want to Book"
          onChange={(e) => setTicket(e.target.value)}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
        </Select>
        {/* Button to book the selected tickets */}
        <Button colorScheme="facebook" p="6" onClick={handleButtonClick}>
          Book Ticket
        </Button>
      </HStack>
    </>
  );
};

export default Home;
