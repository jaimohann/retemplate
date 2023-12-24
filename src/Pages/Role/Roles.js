export const generateRandomData = (count) => {
  const data = [];

  for (let i = 1; i <= count; i++) {
    const firstName = getRandomFirstName();
    const lastName = getRandomLastName();
    const age = getRandomAge();
    const dobFormatted = getRandomDOB();
    const streetName = getRandomStreetName();
    const phone = getRandomPhone(count);

    const record = {
      id: i,
      first_name: firstName,
      age: age,
      last_name: lastName,
      dob_formatted: dobFormatted,
      street_name: streetName,
      phone: phone,
    };

    data.push(record);
  }

  return data;
};

const getRandomFirstName = () => {
  const firstNames = [
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Eva",
    "Frank",
    "Grace",
    "Hank",
    "Ivy",
    "Jack",
  ];
  return firstNames[Math.floor(Math.random() * firstNames.length)];
};

const getRandomLastName = () => {
  const lastNames = [
    "Smith",
    "Johnson",
    "Williams",
    "Jones",
    "Brown",
    "Davis",
    "Miller",
    "Wilson",
    "Moore",
    "Taylor",
  ];
  return lastNames[Math.floor(Math.random() * lastNames.length)];
};

const getRandomAge = () => {
  return Math.floor(Math.random() * 50) + 20; // Generates age between 20 and 69
};

const getRandomDOB = () => {
  const year = Math.floor(Math.random() * (2003 - 1970)) + 1970;
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, "0");
  const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const getRandomStreetName = () => {
  const streetNames = [
    "Maple Avenue",
    "Oak Street",
    "Pine Road",
    "Cedar Lane",
    "Elm Boulevard",
    "Willow Lane",
  ];
  return streetNames[Math.floor(Math.random() * streetNames.length)];
};

const getRandomPhone = (count) => {
  const randomNumber = () =>
    Math.floor(Math.random() * count)
      .toString()
      .padStart(3, "0");
  return `123-${randomNumber()}-${randomNumber()}`;
};

const sampleData = generateRandomData(1000);

// Now you can use the `sampleData` array containing count randomly generated records.
