import React from 'react';

const Header: React.FC<{ cartCount: number }> = ({ cartCount }) => {
    return (
        <nav className="bg-gray-800" data-testid="mock-header">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <a href="#" className="text-white text-lg font-bold">Logo</a>
                    </div>
                    <div className="hidden md:block">
                        <ul className="flex space-x-4">
                            <li><a href='#' className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded">Products</a></li>
                            <li><a href="#" className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded">Cart ({cartCount})</a></li>
                            <li><a href="#" className="text-gray-300 hover:bg-gray-700 px-3 py-2 rounded">Checkout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav >
    );
};

export default Header;