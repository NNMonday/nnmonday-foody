const companies = [
  {
    img: "https://placehold.co/400",
    name: "Amazon",
    location: "USA",
    id: "1",
  },
  {
    img: "https://placehold.co/400",
    name: "Apple",
    location: "USA",
    id: "2",
  },
  {
    img: "https://placehold.co/400",
    name: "Facebook",
    location: "USA",
    id: "3",
  },
  {
    img: "https://placehold.co/400",
    name: "Tencent",
    location: "China",
    id: "4",
  },
  {
    img: "https://placehold.co/400",
    name: "Alibaba",
    location: "China",
    id: "5",
  },
  {
    img: "https://placehold.co/400",
    name: "Samsung",
    location: "South Korea",
    id: "6",
  },
  {
    img: "https://placehold.co/400",
    name: "Sony",
    location: "Japan",
    id: "7",
  },
  {
    img: "https://placehold.co/400",
    name: "IBM",
    location: "USA",
    id: "8",
  },
];

const faqList = [
  {
    title: "Your Account",
    items: [
      {
        header: "Donec in ipsum sit amet mi tincidunt lacinia ut id risus.",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      },
      {
        header:
          "Etiam rutrum ligula at dui tempor, eu tempus ligula tristique.",
        content: "",
      },
      { header: "Morbi vitae neque eu sapien aliquet rhoncus.", content: "" },
    ],
  },
  {
    title: "Companies and Jobs",
    items: [
      {
        header: "Donec in ipsum sit amet mi tincidunt lacinia ut id risus.",
        content: "",
      },
      {
        header:
          "Etiam rutrum ligula at dui tempor, eu tempus ligula tristique.",
        content: "",
      },
      { header: "Morbi vitae neque eu sapien aliquet rhoncus.", content: "" },
    ],
  },
  {
    title: "Candidate & Resume",
    items: [
      {
        header: "Donec in ipsum sit amet mi tincidunt lacinia ut id risus.",
        content: "",
      },
      {
        header:
          "Etiam rutrum ligula at dui tempor, eu tempus ligula tristique.",
        content: "",
      },
      { header: "Morbi vitae neque eu sapien aliquet rhoncus.", content: "" },
    ],
  },
];

const recentNews = [
  {
    id: "1",
    date: "Nov 12, 2021",
    title: "Proin sit amet massa eget odio consectetur ultricies.",
    author: "John Doe",
    description:
      "Integer imperdiet mauris eget nisl ultricies, quis hendrerit est consequat. Vivamus et volutpat odio. Maecenas porta erat sed massa bibendum pellentesque.",
    content: `
    <p>Their aesthetic nature influences people's perception of a brand, making font all the more necessary for digital designers to consider when designing for the web and beyond. Font goes the extra mile. It cements a brand's messaging, aligning a brand to its target audience with each line of header text and subtext within a web design. Below you’ll find 20 cool fonts worth checking out for personal use or your next web or graphic design project. And don’t worry, we’ve included both free and paid fonts!</p>
  `,
  },
  {
    id: "2",
    date: "Nov 12, 2021",
    title: "Praesent tristique sagittis malesuada. Nulla vulputate pretium.",
    author: "John Doe",
    description:
      "Integer imperdiet mauris eget nisl ultricies, quis hendrerit est consequat. Vivamus et volutpat odio. Maecenas porta erat sed massa bibendum pellentesque.",
    content: `
    <p>Their aesthetic nature influences people's perception of a brand, making font all the more necessary for digital designers to consider when designing for the web and beyond. Font goes the extra mile. It cements a brand's messaging, aligning a brand to its target audience with each line of header text and subtext within a web design. Below you’ll find 20 cool fonts worth checking out for personal use or your next web or graphic design project. And don’t worry, we’ve included both free and paid fonts!</p>
  `,
  },
  {
    id: "3",
    date: "Nov 12, 2021",
    title: "Integer volutpat fringilla ipsum, nec tempor risus facilisis eget.",
    author: "John Doe",
    description:
      "Integer imperdiet mauris eget nisl ultricies, quis hendrerit est consequat. Vivamus et volutpat odio. Maecenas porta erat sed massa bibendum pellentesque.",
    content: `
    <p>Their aesthetic nature influences people's perception of a brand, making font all the more necessary for digital designers to consider when designing for the web and beyond. Font goes the extra mile. It cements a brand's messaging, aligning a brand to its target audience with each line of header text and subtext within a web design. Below you’ll find 20 cool fonts worth checking out for personal use or your next web or graphic design project. And don’t worry, we’ve included both free and paid fonts!</p>
  `,
  },
];

const newsArticles = [
  {
    id: "1",
    date: "Nov 12, 2021",
    title: "Proin sit amet massa eget odio consectetur ultricies.",
    author: "John Doe",
    description:
      "Integer imperdiet mauris eget nisl ultricies, quis hendrerit est consequat. Vivamus et volutpat odio. Maecenas porta erat sed massa bibendum pellentesque.",
    content: `
    <p>Their aesthetic nature influences people's perception of a brand, making font all the more necessary for digital designers to consider when designing for the web and beyond. Font goes the extra mile. It cements a brand's messaging, aligning a brand to its target audience with each line of header text and subtext within a web design. Below you’ll find 20 cool fonts worth checking out for personal use or your next web or graphic design project. And don’t worry, we’ve included both free and paid fonts!</p>
  `,
  },
  {
    id: "2",
    date: "Nov 12, 2021",
    title: "Praesent tristique sagittis malesuada. Nulla vulputate pretium.",
    author: "John Doe",
    description:
      "Integer imperdiet mauris eget nisl ultricies, quis hendrerit est consequat. Vivamus et volutpat odio. Maecenas porta erat sed massa bibendum pellentesque.",
    content: `
    <p>Their aesthetic nature influences people's perception of a brand, making font all the more necessary for digital designers to consider when designing for the web and beyond. Font goes the extra mile. It cements a brand's messaging, aligning a brand to its target audience with each line of header text and subtext within a web design. Below you’ll find 20 cool fonts worth checking out for personal use or your next web or graphic design project. And don’t worry, we’ve included both free and paid fonts!</p>
  `,
  },
  {
    id: "3",
    date: "Nov 12, 2021",
    title: "Integer volutpat fringilla ipsum, nec tempor risus facilisis eget.",
    author: "John Doe",
    description:
      "Integer imperdiet mauris eget nisl ultricies, quis hendrerit est consequat. Vivamus et volutpat odio. Maecenas porta erat sed massa bibendum pellentesque.",
    content: `
    <p>Their aesthetic nature influences people's perception of a brand, making font all the more necessary for digital designers to consider when designing for the web and beyond. Font goes the extra mile. It cements a brand's messaging, aligning a brand to its target audience with each line of header text and subtext within a web design. Below you’ll find 20 cool fonts worth checking out for personal use or your next web or graphic design project. And don’t worry, we’ve included both free and paid fonts!</p>
  `,
  },
  {
    id: "4",
    date: "Nov 12, 2021",
    title: "Proin sit amet massa eget odio consectetur ultricies.",
    author: "John Doe",
    description:
      "Integer imperdiet mauris eget nisl ultricies, quis hendrerit est consequat. Vivamus et volutpat odio. Maecenas porta erat sed massa bibendum pellentesque.",
    content: `
    <p>Their aesthetic nature influences people's perception of a brand, making font all the more necessary for digital designers to consider when designing for the web and beyond. Font goes the extra mile. It cements a brand's messaging, aligning a brand to its target audience with each line of header text and subtext within a web design. Below you’ll find 20 cool fonts worth checking out for personal use or your next web or graphic design project. And don’t worry, we’ve included both free and paid fonts!</p>
  `,
  },
  {
    id: "5",
    author: "John Doe",
    date: "Nov 12, 2021",
    title: "Praesent tristique sagittis malesuada. Nulla vulputate pretium.",
    description:
      "Integer imperdiet mauris eget nisl ultricies, quis hendrerit est consequat. Vivamus et volutpat odio. Maecenas porta erat sed massa bibendum pellentesque.",
    content: `
    <p>Their aesthetic nature influences people's perception of a brand, making font all the more necessary for digital designers to consider when designing for the web and beyond. Font goes the extra mile. It cements a brand's messaging, aligning a brand to its target audience with each line of header text and subtext within a web design. Below you’ll find 20 cool fonts worth checking out for personal use or your next web or graphic design project. And don’t worry, we’ve included both free and paid fonts!</p>
  `,
  },
  {
    id: "6",
    author: "John Doe",
    date: "Nov 12, 2021",
    title: "Integer volutpat fringilla ipsum, nec tempor risus facilisis eget.",
    description:
      "Integer imperdiet mauris eget nisl ultricies, quis hendrerit est consequat. Vivamus et volutpat odio. Maecenas porta erat sed massa bibendum pellentesque.",
    content: `
    <p>Their aesthetic nature influences people's perception of a brand, making font all the more necessary for digital designers to consider when designing for the web and beyond. Font goes the extra mile. It cements a brand's messaging, aligning a brand to its target audience with each line of header text and subtext within a web design. Below you’ll find 20 cool fonts worth checking out for personal use or your next web or graphic design project. And don’t worry, we’ve included both free and paid fonts!</p>
  `,
  },
];

const jobCategories = [
  {
    name: "Marketing",
    id: 1,
  },
  {
    name: "Software Engineering",
    id: 2,
  },
  {
    name: "Finance",
    id: 3,
  },
];

const jobs = [
  {
    id: 1,
    name: "Dribbble",
    location: "United States",
    openPositions: 3,
    logo: "https://placehold.co/400",
  },
  {
    id: 2,
    name: "Udemy",
    location: "China",
    openPositions: 3,
    logo: "https://placehold.co/400",
  },
  {
    id: 3,
    name: "Figma",
    location: "United States",
    openPositions: 3,
    logo: "https://placehold.co/400",
  },
  {
    id: 4,
    name: "Shopify",
    location: "Canada",
    openPositions: 3,
    logo: "https://placehold.co/400",
  },
  {
    id: 5,
    name: "InVision",
    location: "United States",
    openPositions: 3,
    logo: "https://placehold.co/400",
  },
  {
    id: 6,
    name: "Slack",
    location: "United States",
    openPositions: 3,
    logo: "https://placehold.co/400",
  },
  {
    id: 7,
    name: "Google",
    location: "United States",
    openPositions: 3,
    logo: "https://placehold.co/400",
  },
  {
    id: 8,
    name: "Facebook",
    location: "United States",
    openPositions: 3,
    logo: "https://placehold.co/400",
  },
  {
    id: 9,
    name: "Twitter",
    location: "United States",
    openPositions: 3,
    logo: "https://placehold.co/400",
  },
  {
    id: 10,
    name: "Instagram",
    location: "United States",
    openPositions: 3,
    logo: "https://placehold.co/400",
  },
  {
    id: 11,
    name: "Snapchat",
    location: "United States",
    openPositions: 3,
    logo: "https://placehold.co/400",
  },
  {
    id: 12,
    name: "LinkedIn",
    location: "United States",
    openPositions: 3,
    logo: "https://placehold.co/400",
  },
  {
    id: 13,
    name: "Pinterest",
    location: "United States",
    openPositions: 3,
    logo: "https://placehold.co/400",
  },
  {
    id: 14,
    name: "TikTok",
    location: "United States",
    openPositions: 3,
    logo: "https://placehold.co/400",
  },
  {
    id: 15,
    name: "Twitch",
    location: "United States",
    openPositions: 3,
    logo: "https://placehold.co/400",
  },
  {
    id: 16,
    name: "Reddit",
    location: "United States",
    openPositions: 3,
    logo: "https://placehold.co/400",
  },
];

const notifications = [
  { id: 1, text: "New comment on your post" },
  { id: 2, text: "New follower" },
  { id: 3, text: "Server update tonight" },
];

const messages = [
  { id: 1, sender: "John Doe", text: "Hey, how are you?" },
  { id: 2, sender: "Jane Smith", text: "Project update?" },
  { id: 3, sender: "Michael Lee", text: "Let's schedule a meeting." },
];

export {
  companies,
  faqList,
  recentNews,
  newsArticles,
  jobs,
  jobCategories,
  notifications,
  messages,
};
