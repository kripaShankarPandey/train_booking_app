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
  //Get all sheet data from server and show in UI
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [ticketQty, setTicket] = useState(0);

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8000/allsheet")
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((e) => setError(true));
  }, []);

  return (
    <>
      <Box>
        <Heading size={"xl"} m="5" textAlign={"center"}>
          Traing Ticket Booking App
        </Heading>
      </Box>
      {loading ? (
        <Stack w="80%" m="auto">
          <Skeleton height="100px" />
          <Skeleton height="100px" />
          <Skeleton height="100px" />
          <Skeleton height="100px" />
          <Skeleton height="100px" />
        </Stack>
      ) : (
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
      <HStack w={{ sm: "80%", lg: "50%" }} m="auto" mt="5">
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
        <Button colorScheme="facebook" p="6">
          Book Ticket
        </Button>
      </HStack>
    </>
  );
};

export default Home;
