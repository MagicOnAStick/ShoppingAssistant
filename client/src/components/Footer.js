import React from 'react';

export default () => {
  return (
    <footer className="bg-dark text-white p-4 text-center myfooter">
      Copyright &copy; {new Date().getFullYear()} ShoppingList
    </footer>
  );
};