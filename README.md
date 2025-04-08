This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

# Car Finder Web App

A comprehensive web application for searching, filtering, and finding cars with a wishlist feature. Built with Next.js, React, and TailwindCSS.

## Features

- **Search & Filter**: Find cars by brand, price range, fuel type, and seating capacity
- **Car Details**: View detailed information about each car
- **Wishlist**: Save favorite cars to a wishlist (stored in local storage)
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works on all screen sizes
- **Real-time UI Updates**: See results change instantly as you apply filters
- **Sort Options**: Sort cars by price (low to high, high to low)
- **Pagination**: Browse through results with 10 cars per page

## Technology Stack

- **Frontend Framework**: Next.js (App Router)
- **UI Library**: React.js
- **State Management**: React useState, useEffect hooks
- **CSS Framework**: TailwindCSS
- **Storage**: LocalStorage for wishlist items
- **Icons**: Heroicons
- **API**: Next.js API Routes for fetching car data

## Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/car-finder.git
cd car-finder
```

2. **Install dependencies**

```bash
npm install
```

3. **Run the development server**

```bash
npm run dev
```

4. **Open your browser**

Visit `http://localhost:3000` to see the application in action.

## Project Structure

```
car-finder/
├── src/
│   ├── app/              # App router pages
│   │   ├── api/          # API routes
│   │   ├── cars/         # Car details pages
│   │   ├── wishlist/     # Wishlist page
│   │   ├── globals.css   # Global styles
│   │   ├── layout.js     # Root layout
│   │   └── page.js       # Home page
│   ├── components/       # Reusable components
│   ├── context/          # Context providers
│   ├── data/             # Mock data
│   └── utils/            # Utility functions
├── public/               # Static assets
├── next.config.js
├── package.json
├── tailwind.config.js
└── README.md
```

## Component Architecture

- **CarFinderContext**: Global state management for wishlist and dark mode
- **Layout**: Contains navbar, main content area, and footer
- **HomePage**: Main search and filter interface
- **CarDetailsPage**: Detailed view of a specific car
- **WishlistPage**: Collection of saved cars
- **FilterPanel**: Contains all filter options
- **CarGrid**: Displays car cards in a responsive grid
- **Pagination**: Navigate through pages of results
- **SearchBar**: Search functionality
- **SortOption**: Sort cars by price
- **WishlistButton**: Toggle wishlist status for a car
- **Loading**: Loading state indicator
- **ErrorDisplay**: Error state indicator

## API Structure

- **GET /api/cars**: Fetch all cars
- **GET /api/cars/[id]**: Fetch specific car details

## Extending the Project

### Adding New Features

- **User Authentication**: Add login/signup for persistent wishlists
- **Compare Cars**: Allow users to compare multiple cars side by side
- **Reviews & Ratings**: Add user reviews and ratings for cars
- **Location-based Search**: Find cars near the user's location
- **Test Drive Booking**: Schedule test drives for selected cars

### Styling Customization

The project uses TailwindCSS, which makes it easy to customize the appearance:

1. Modify `tailwind.config.js` to change the color scheme, fonts, etc.
2. Update `globals.css` for global styling overrides
3. Component-level styling can be adjusted directly in the component files

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Icons from [Heroicons](https://heroicons.com/)
- Next.js documentation and examples
- TailwindCSS for the styling framework
