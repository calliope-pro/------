import Head from 'next/head';
import {
  Box,
  CircularProgress,
  Container,
  Divider,
  GridItem,
  Image,
  ListItem,
  SimpleGrid,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import useSWR from 'swr';
import axios from 'axios';

export default function Home() {
  const { data } = useSWR(
    '/api/fetch',
    async (url) =>
      (await axios.get(url)).data as {
        posts: {
          title: string;
          key: string;
        }[];
        dates: {
          key: string;
          date: string;
        }[];
      }
  );
  if (!data)
    return (
      <Box textAlign='center'>
        <CircularProgress isIndeterminate size={80} />
      </Box>
    );
  return (
    <Box px={1} pb={5}>
      <Head>
        <title>雑貨屋アリス</title>
        <meta name='description' content='雑貨屋アリス' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Box pos='relative'>
        <Box
          color='white'
          fontSize={{ base: '3xl', md: '5xl' }}
          pos='absolute'
          transform='translate(-50%,-50%)'
          top='20%'
          left='50%'
        >
          雑貨屋アリス
        </Box>
        <Text
          color='white'
          fontSize={{ base: 'xl', md: '2xl' }}
          pos='absolute'
          transform='translate(-50%,-50%)'
          top='45%'
          left='50%'
        >
          住所:札幌市厚別区厚別町山本1063-93
        </Text>
        <Text
          color='white'
          fontSize={{ base: 'xl', md: '2xl' }}
          pos='absolute'
          transform='translate(-50%,-50%)'
          top='65%'
          left='50%'
        >
          TEL: <wbr />
          080-9612-5786
        </Text>
        <Image src='/e.jpg' boxSize='100%' alt='参考画像' />
      </Box>

      <SimpleGrid mt={4} columns={12} spacing={4}>
        <GridItem colSpan={6}>
          <Box
            as='iframe'
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11659.531424324383!2d141.4608841198105!3d43.06493125891987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5f0b2c6968e8be53%3A0x1eeb4a83d6043369!2z44CSMDA0LTAwNjkg5YyX5rW36YGT5pyt5bmM5biC5Y6a5Yil5Yy65Y6a5Yil55S65bGx5pys77yR77yQ77yW77yT4oiS77yZ77yT!5e0!3m2!1sja!2sjp!4v1667993592716!5m2!1sja!2sjp'
            border={0}
            w='100%'
            h='100%'
            allowFullScreen
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
          />
        </GridItem>
        <GridItem display='flex' alignItems='center' colSpan={3}>
          <Image src='/a.jpg' alt='' />
        </GridItem>
        <GridItem display='flex' alignItems='center' colSpan={3}>
          <Image src='/b.jpg' alt='' />
        </GridItem>
        <GridItem colSpan={4}>
          <Image src='/c.jpg' alt='' />
        </GridItem>
        <GridItem colSpan={4}>
          <Image src='/d.jpg' alt='' />
        </GridItem>
        <GridItem colSpan={4}>
          <Image src='/f.jpg' alt='' />
        </GridItem>
      </SimpleGrid>

      <Container>
        <Text fontSize='3xl' mt={4}>
          お知らせ
        </Text>
        <UnorderedList spacing={2}>
          {data.posts.map(({ key, title }) => (
            <ListItem key={key}>{title}</ListItem>
          ))}
        </UnorderedList>
        <Text fontSize='3xl'>お願い</Text>
        <Text>
          お支払いは現金のみとさせていただきます。
          <Text fontSize='xl' as='span'>
            駐車場有ります。
          </Text>
        </Text>
        <Divider />
        <Text fontSize='2xl'>
          休み不定休
          <Text as='span' fontSize='xl'>
            ・・・電話にてご確認ください。
          </Text>
          現在の休業日予定
        </Text>
        <UnorderedList spacing={2}>
          {data.dates.map(({ key, date }) => (
            <ListItem key={key}>{date}</ListItem>
          ))}
        </UnorderedList>
      </Container>
    </Box>
  );
}
