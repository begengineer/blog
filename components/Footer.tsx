export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Uki Tech. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
