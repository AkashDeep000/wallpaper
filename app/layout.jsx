import './globals.css'
import Header from "@/Header"
import pb from 'pb'

export const revalidate = 3; 
async function getCategories() {
  const categories = await pb.records.getFullList('categories', 200, {
    sort: 'created',
});
  return categories;
}

export default async function RootLayout({ children }) {
/*const categories = await getCategories()
const menuData = []
categories.items?.forEach(el => {
  menuData.push(el.name)
})*/
  return (
    <html lang="en">
      <head />
      <body className="min-h-screen grid grid-rows-[auto_1fr_auto]">
      <Header />
      <div>
      {children}
      </div>
      <footer className="mt-4 p-6 pt-8 bg-gray-800 text-white text-center">
      <p> Build with ❤️ in india </p>
      </footer>
      
      </body>
    </html>
  )
}
