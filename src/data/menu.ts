export type Size = { label: string; price: number };

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  category: "pizzas" | "sides" | "drinks" | "desserts";
  image: string;
  sizes?: Size[];
  price?: number;
  popular?: boolean;
  veggie?: boolean;
  spicy?: boolean;
};

export const CATEGORIES = [
  {
    id: "all",
    label: "Everything",
  },
  {
    id: "pizzas",
    label: "Pizzas",
  },
  {
    id: "sides",
    label: "Wings & Sides",
  },
  {
    id: "drinks",
    label: "Drinks",
  },
  {
    id: "desserts",
    label: "Desserts",
  },
] as const;

export const MENU: MenuItem[] = [
  {
    id: "caprese",
    name: "The Caprese",
    description:
      "Fresh mozzarella folded into the dough, market tomatoes, basil and a balsamic drizzle after the oven.",
    category: "pizzas",
    image: "/images/hero-caprese.jpg",
    sizes: [
      { label: "12 inch", price: 11.99 },
      { label: "16 inch", price: 15.99 },
    ],
    popular: true,
    veggie: true,
  },
  {
    id: "hot-honey-pepperoni",
    name: "Hot Honey Pepperoni",
    description:
      "Cup and char pepperoni, whole milk mozzarella and a slow drizzle of wildflower honey. Sweet, spicy, a little addictive.",
    category: "pizzas",
    image: "/images/pizza-pepperoni.jpg",
    sizes: [
      { label: "12 inch", price: 12.99 },
      { label: "16 inch", price: 16.99 },
    ],
    popular: true,
    spicy: true,
  },
  {
    id: "ember-bbq",
    name: "The Ember BBQ",
    description:
      "Smoked chicken, red onion, sharp cheddar and cilantro over our house barbecue sauce. Napkins required.",
    category: "pizzas",
    image: "/images/pizza-bbq.jpg",
    sizes: [
      { label: "12 inch", price: 13.49 },
      { label: "16 inch", price: 17.49 },
    ],
    popular: true,
  },
  {
    id: "margherita",
    name: "Margherita",
    description:
      "San Marzano tomatoes, fior di latte and basil pulled from the plant an hour before service.",
    category: "pizzas",
    image: "/images/pizza-margherita.jpg",
    sizes: [
      { label: "12 inch", price: 10.99 },
      { label: "16 inch", price: 14.49 },
    ],
    veggie: true,
  },
  {
    id: "garden-prime",
    name: "Garden Prime",
    description:
      "Roasted peppers, mushrooms, olives and red onion on a thin crust with garlic oil.",
    category: "pizzas",
    image: "/images/pizza-veggie.jpg",
    sizes: [
      { label: "12 inch", price: 12.49 },
      { label: "16 inch", price: 15.99 },
    ],
    veggie: true,
  },
  {
    id: "carnivore",
    name: "The Carnivore",
    description:
      "Sausage, bacon, pepperoni and smoked ham. Four meats, no apologies.",
    category: "pizzas",
    image: "/images/pizza-meat.jpg",
    sizes: [
      { label: "12 inch", price: 14.49 },
      { label: "16 inch", price: 18.49 },
    ],
  },
  {
    id: "aloha",
    name: "The Aloha",
    description:
      "Smoked ham and caramelized pineapple. Marco objected, the neighborhood voted, the neighborhood won.",
    category: "pizzas",
    image: "/images/pizza-hawaiian.jpg",
    sizes: [
      { label: "12 inch", price: 12.99 },
      { label: "16 inch", price: 16.49 },
    ],
  },
  {
    id: "quattro",
    name: "Quattro Formaggi",
    description:
      "Mozzarella, parmesan, provolone and a whisper of gorgonzola, finished with black pepper.",
    category: "pizzas",
    image: "/images/pizza-cheese.png",
    sizes: [
      { label: "12 inch", price: 12.99 },
      { label: "16 inch", price: 16.49 },
    ],
    veggie: true,
  },
  {
    id: "buffalo-wings",
    name: "Ember Buffalo Wings",
    description:
      "Twice fried, tossed in our buffalo sauce, served with buttermilk ranch and celery.",
    category: "sides",
    image: "/images/side-wings.jpg",
    price: 11.49,
    popular: true,
    spicy: true,
  },
  {
    id: "skin-fries",
    name: "Skin On Fries",
    description:
      "Hand cut, twice fried and salted the second they leave the oil. Feeds two, barely.",
    category: "sides",
    image: "/images/side-fries.jpg",
    price: 5.49,
  },
  {
    id: "garlic-bread",
    name: "Cheesy Garlic Bread",
    description:
      "Our pizza dough baked with butter, mozzarella, garlic and oregano, cut into sticks.",
    category: "sides",
    image: "/images/side-garlic.jpg",
    price: 6.99,
    veggie: true,
  },
  {
    id: "cola",
    name: "Glass Bottle Cola",
    description: "The real thing, poured over crushed ice. Cane sugar only.",
    category: "drinks",
    image: "/images/drink-cola.jpg",
    price: 2.5,
  },
  {
    id: "lemonade",
    name: "Fresh Pressed Lemonade",
    description:
      "Squeezed every morning with mint from the window box. Not too sweet.",
    category: "drinks",
    image: "/images/drink-lemonade.jpg",
    price: 3.5,
    popular: true,
  },
  {
    id: "shake",
    name: "Chocolate Malt Shake",
    description: "Hand spun with dark chocolate syrup and malted milk powder.",
    category: "drinks",
    image: "/images/drink-milkshake.jpg",
    price: 5.5,
  },
  {
    id: "peach-tea",
    name: "Peach Iced Tea",
    description: "Brewed black tea with grilled peaches. Summer in a glass.",
    category: "drinks",
    image: "/images/drink-icedtea.jpg",
    price: 3.5,
  },
  {
    id: "cookie",
    name: "Double Chocolate Cookie",
    description:
      "Baked at 6am daily, still warm at lunch if you time it right.",
    category: "desserts",
    image: "/images/dessert-cookie.jpg",
    price: 3.0,
    popular: true,
  },
  {
    id: "sundae",
    name: "Strawberry Sundae",
    description:
      "Vanilla bean ice cream layered with macerated strawberries and shortbread.",
    category: "desserts",
    image: "/images/dessert-icecream.jpg",
    price: 4.5,
    veggie: true,
  },
];

export const byId = (id: string) => MENU.find((m) => m.id === id);

export const DEAL = {
  itemId: "margherita",
  sizeLabel: "12 inch",
  price: 8.99,
  note: "Today only, while the basil lasts.",
};

export const formatPrice = (n: number) => `$${n.toFixed(2)}`;
