function Footer() {
  return (
    <footer className="mt-16 border-t bg-white py-6">
      <div className="mx-auto max-w-7xl px-6 text-center text-sm text-gray-500">
        <p>
          © {new Date().getFullYear()} Project Showcase.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;