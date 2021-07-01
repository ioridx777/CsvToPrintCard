import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import fs from "fs";
import csvParse from "csv-parse/lib/sync";
import styled from "styled-components";
import { useRouter } from "next/router";

const CardFrame = styled.div`
  background: white;
  border: 1px solid black;
`;

const CardGrid = styled.div`
  display: grid;
  width: 21cm;
  height: 29.7cm;
  padding: 10mm;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  column-gap: 10px;
  row-gap: 10px;
`;
const Title = styled.div`
  margin: 5mm;
  font-size: 5mm;
  text-align: center;
`;
const Content = styled.div`
  position: relative;
  min-height: 30mm;
  padding: 1mm;
  width: calc(100%-10mm);
  margin: 5mm;
  border: 1px solid black;
`;
const CardBackTitle = styled.div`
  font-size: 7mm;
  margin: 3mm;
`;

const CardFront = ({ content }: { content: any }) => {
  if (content == null) return <CardFrame />;
  return (
    <CardFrame
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <Title>{content[0]}</Title>
      <Content>{content[1]}</Content>
    </CardFrame>
  );
};

const CardBack = ({ content }: { content: any }) => {
  if (content == null) return <CardFrame />;
  return (
    <CardFrame
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <CardBackTitle>{content[2]}</CardBackTitle>
    </CardFrame>
  );
};

export default function Home({ content }: any) {
  const cardsContent = [...content[0].slice(1, content[0].length)];
  let cards = [];
  // for (let i = 0; i < 9; i++) {
  //   cards.push(<CardFront content={cardsContent[i]} />);
  // }

  for (let i = 0; i < cardsContent.length; i += 9) {
    let cardFrontGridList = [];
    for (let j = 0; j < 9; j++) {
      console.log(`${i} ${j} ${i + j}`);
      cardFrontGridList.push(
        <CardFront
          key={`CardFront${i + j}`}
          content={cardsContent[i + j] || null}
        />
      );
    }
    cards.push(
      <CardGrid key={`CardGrid ${i / 9}`}>{cardFrontGridList}</CardGrid>
    );
    let cardBackGridList = [];

    for (let j = 0; j < 9; j += 3) {
      for (let k = 2; k >= 0; k--) {
        console.log(`${i} ${j} ${i + j}`);
        cardBackGridList.push(
          <CardBack
            key={`CardBack${i + j + k}`}
            content={cardsContent[i + j + k] || null}
          />
        );
      }
    }
    cards.push(
      <CardGrid key={`CardGrid ${i / 9}`}>{cardBackGridList}</CardGrid>
    );
  }

  return <>{cards}</>;
  return (
    <div className={styles.container}>
      start
      <br />
      {JSON.stringify(content[0])}
      <br />
      end
      <br />
      <CardFront content={"hello"} />
      {/* {Object.keys(content[0])} */}
    </div>
  );
}

export async function getStaticProps() {
  const csvDir = fs.readdirSync("csv");
  const content = {};
  // const parsedContent = csvParse(content[0]);
  // console.log(JSON.stringify(parsedContent[0]));
  for (let dir in csvDir) {
    Object.assign(content, {
      [dir]: csvParse(fs.readFileSync("csv/" + csvDir[dir], "utf8")),
    });
  }
  return {
    props: {
      content: content,
    },
  };
}
