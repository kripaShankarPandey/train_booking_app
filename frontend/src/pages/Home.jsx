import React, { useState } from "react";
import { Box, Button, HStack, Heading, Select } from "@chakra-ui/react";
const Home = () => {
  let sheet = new Array(80).fill(0);
  const [ticket, setTicket] = useState(0);
  console.log(ticket);
  return (
    <>
      <Box>
        <Heading size={"xl"} m="5" textAlign={"center"}>
          Traing Ticket Booking App
        </Heading>
      </Box>
      <Box
        w={{ sm: "95%", lg: "80%" }}
        m="auto"
        display={"grid"}
        gridTemplateColumns={"repeat(7,1fr)"}
        gap={"2.5"}
      >
        {sheet.map((e, ind) => (
          <Button colorScheme="whatsapp" size={"sm"}>
            {ind + 1}
          </Button>
        ))}
      </Box>
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
