import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: 'A First Meetup',
    image: 'https://ntvb.tmsimg.com/assets/p12386480_v_h10_az.jpg?w=960&h=540',
    address: 'Some address 5, 12345 Some City',
    description: 'This is a first meetup!',
  },
  {
    id: 'm2',
    title: 'A Second Meetup',
    image: 'https://ntvb.tmsimg.com/assets/p12386480_v_h10_az.jpg?w=960&h=540',
    address: 'Some address 10, 12345 Some City',
    description: 'This is a second meetup!',
  },
];

const HomePage = (props) => {
  return <MeetupList meetups={props.meetups} />;
};

export const getStaticProps = async () => {
  return {
    props: {
      meetups: DUMMY_MEETUPS,
    },
  };
};

export default HomePage;
