import React, { useState, useEffect } from "react";
import { Box, Button, Container, Heading, Text, VStack, HStack, Progress, useToast } from "@chakra-ui/react";
import { FaPlay, FaPause, FaSync } from "react-icons/fa";

const Index = () => {
  const [isCalculating, setIsCalculating] = useState(false);
  const [primeNumbers, setPrimeNumbers] = useState([]);
  const [progress, setProgress] = useState(0);
  const toast = useToast();

  // Dummy function to simulate prime number calculation
  const calculatePrimes = () => {
    if (!isCalculating) {
      setIsCalculating(true);
      // This would be a call to start a web worker or similar process
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setPrimeNumbers((prevPrimes) => [...prevPrimes, "2^(n)-1"]); // This should be replaced with actual calculated prime
            clearInterval(interval);
            setIsCalculating(false);
            toast({
              title: "New Mersenne Prime Found!",
              description: "2^(n)-1 has been added to the list.",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            return 0;
          }
          return prev + 10; // Incremental progress
        });
      }, 1000);
    }
  };

  // Simulate pausing the calculation
  const pauseCalculation = () => {
    setIsCalculating(false);
    // Pause the web worker or similar process here
  };

  // Reset the progress and primes found
  const resetCalculation = () => {
    setIsCalculating(false);
    setProgress(0);
    setPrimeNumbers([]);
    // Reset the web worker or similar process here
  };

  useEffect(() => {
    // Initialize the calculation process when component mounts
    calculatePrimes();
    return () => {
      // Clean up the calculation process when component unmounts
      pauseCalculation();
    };
  }, []);

  return (
    <Container maxW="container.md" py={10}>
      <VStack spacing={6}>
        <Heading>Mersenne Prime Generator</Heading>
        <Text>Connect and help calculate Mersenne prime numbers!</Text>
        <Box w="100%">
          <Progress value={progress} size="lg" colorScheme="green" />
        </Box>
        <HStack>
          <Button leftIcon={<FaPlay />} colorScheme="green" variant="solid" onClick={calculatePrimes} isDisabled={isCalculating}>
            Start
          </Button>
          <Button leftIcon={<FaPause />} colorScheme="yellow" variant="solid" onClick={pauseCalculation} isDisabled={!isCalculating}>
            Pause
          </Button>
          <Button leftIcon={<FaSync />} colorScheme="red" variant="solid" onClick={resetCalculation}>
            Reset
          </Button>
        </HStack>
        <Heading size="md">Found Primes</Heading>
        <VStack>
          {primeNumbers.map((prime, index) => (
            <Text key={index}>{prime}</Text>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;
