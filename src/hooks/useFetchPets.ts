import { useState, useEffect } from 'react';

interface Pet {
  title: string;
  description: string;
  url: string;
}

const useFetchPets = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPets = async () => {
      const response = await fetch('https://eulerity-hackathon.appspot.com/pets');
      const data = await response.json();
      setPets(data);
      setLoading(false);
    };
    fetchPets();
  }, []);

  return { pets, loading };
};

export default useFetchPets;