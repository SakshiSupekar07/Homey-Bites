

import facebook_icon from '../assets/util/facebook_icon.png';
import linkedin_icon from '../assets/util/linkedin_icon.png';
import twitter_icon from '../assets/util/twitter_icon.png';


import search_icon from './util/search_icon.png';


import homeybites from '../assets/util/homeybites-logo.png';

import profile_image from '../assets/util/profile.png';

import thali1 from '../assets/Thalis/thali1.jpg';
import thali2 from '../assets/Thalis/thali2.jpg'
import thali3 from '../assets/Thalis/thali3.jpg'
import thali4 from '../assets/Thalis/thali4.jpg'
import pohe from '../assets/Breakfast/pohe.jpg';
import upma from '../assets/Breakfast/upma.jpg';



export const assets = {
  facebook_icon,
  linkedin_icon,
  twitter_icon,
  homeybites,
  search_icon,
  profile_image
};

export const food_list = [
  {
    _id: '1',
    name: 'Punjabi Thali',
    image: thali1,
    
    description: ' Provides the platter of traditional dishes like curries,rice ,pickles and chapatis.',
  },
  {
    _id: '2',
    name: 'Veg Thali',
    image: thali2,
   
    description: ' An Indian thali featuring vegeterian dishes including curries dal roti and rice .',
  },
  {
    _id: '3',
    name: ' Deluxe Thali',
    image: thali3,
  
    description: 'Offers  a variety of flavouful dishes including curries and deserts.',
  },

  {
    _id: '4',
    name: ' Standard Thali ',
    image: thali4,
   
    description: 'Featuring basic dishes like dal and vegetables. ',
  },
 
  ]
  export const breakfast_list=[
    {
      id:'1',
      name:'Pohe',
      image:pohe,
      description:'best breakfast',

    },
    {
      id:'2',
      name:'Upma',
      image:upma,
      description:'Good',

    }
  ]
