import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PokemonInfoPage.css";
import {
  Table, Tbody, Tr, Td, TableContainer, Button, Spinner,
} from '@chakra-ui/react'
import axios from "axios";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

export default function PokemonInfoPage() {

  const { pathname } = useLocation(),
    navigate = useNavigate(),
    max = 386,
    [pokemonData, setPokemonData] = useState({}),
    [isLoading, setIsLoading] = useState(true),
    navigateNextPrevious = (object) => {
      navigate(`/${object.name}`);
    };

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      const currentPokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon${pathname}`),
        id = currentPokemon.data.id,
        speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
        nextPokemon = id > 0 && id < max ? await axios.get(`https://pokeapi.co/api/v2/pokemon/${id + 1}`) : {},
        prevPokemon = id > 1 && id <= max ? await axios.get(`https://pokeapi.co/api/v2/pokemon/${id - 1}`) : {};

      speciesResponse.data.flavor_text_entries = speciesResponse.data?.flavor_text_entries.filter(ele => ele.language.name === "en");

      setPokemonData(prev => {
        return {
          ...prev, ...speciesResponse.data, ...currentPokemon.data, ...{ next: nextPokemon?.data, previous: prevPokemon?.data }
        }
      });
      setIsLoading(false)
    };
    fetchData();
  }, [pathname])



  return (
    isLoading ? <div className="min-h-screen flex items-center justify-center">
      <Spinner size="xl" mt={4} />
    </div> :
      <div className="infopage">
        <div className="flex justify-center mt-8">
          <span className="text-2xl">{capitalization(pokemonData.name)}</span>
        </div>
        <div className="mx-4 flex justify-between">
          {
            pokemonData?.previous?.id ?
              <Button onClick={() => navigateNextPrevious(pokemonData?.previous)} leftIcon={<ArrowLeftIcon />} colorScheme="blue" variant="link">
                {createDexNumber(pokemonData?.previous?.id) + " " + capitalization(pokemonData?.previous?.name)}
              </Button> :
              <span></span>
          }
          {
            pokemonData?.next?.id ?
              <Button onClick={() => navigateNextPrevious(pokemonData?.next)} rightIcon={<ArrowRightIcon />} colorScheme="blue" variant="link">{createDexNumber(pokemonData?.next?.id) + " " + capitalization(pokemonData?.next?.name)}
              </Button> :
              <span></span>
          }
        </div>
        <main className="infopage__main">
          <div className="py-1">
            {pokemonData.flavor_text_entries?.[Math.floor(Math.random() * pokemonData.flavor_text_entries.length)].flavor_text}
          </div>
          <div className="infopage__main__first mt-8">
            <img
              src={`https://img.pokemondb.net/sprites/home/normal/2x/${pokemonData.name}.jpg`}
              alt={pokemonData.name}
              loading="lazy"
            />
            <TableContainer >
              <Table variant="simple">
                <Tbody>
                  <Tr>
                    <Td>National No</Td>
                    <Td>{createDexNumber(pokemonData.id)}</Td>
                  </Tr>
                  <Tr>
                    <Td>Type</Td>
                    <Td>
                      <div>
                        {pokemonData?.types?.map((ele, idx) => <span key={idx} className={`${ele.type.name}-background px-4 rounded-md mr-2`}>{capitalization(ele.type.name)}</span>)}
                      </div>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td>Height</Td>
                    <Td>{unitConvertor(pokemonData?.height)} m</Td>
                  </Tr>
                  <Tr>
                    <Td>Weight</Td>
                    <Td>{unitConvertor(pokemonData?.weight)} kg</Td>
                  </Tr>
                  <Tr>
                    <Td>Abilities</Td>
                    <Td>
                      <div className="flex flex-col">
                        {pokemonData?.abilities?.map((ele, idx) => <span key={idx}>{capitalization(ele.ability.name)}</span>)}
                      </div>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
            <TableContainer >
              <Table variant="simple">
                <Tbody>
                  {
                    pokemonData?.stats?.map((ele, idx) => <Tr key={idx}>
                      <Td>{capitalization(ele.stat.name)}</Td>
                      <Td>{ele.base_stat}</Td>
                    </Tr>)
                  }
                  <Tr>
                    <Td>Total</Td>
                    <Td>{pokemonData?.stats?.reduce((accumulator, currentValue) => accumulator + Number(currentValue.base_stat), 0)}</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
          </div>
        </main>
      </div>
  );
}

function capitalization(value) {
  if (!value) {
    return "";
  }
  return `${value[0].toUpperCase()}${value.substring(1)}`;
}

function createDexNumber(num) {
  if (!num) {
    return "";
  }
  num = "0" + num;
  while (num.length < 4) {
    num = "0" + num;
  }
  return num;
}

function unitConvertor(value) {
  return (Number(value) * 0.1).toFixed(1)
}