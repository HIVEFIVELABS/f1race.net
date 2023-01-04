// SingleColumnSection.jsx

import React from 'react';

type Props = {
    children?: React.ReactNode;
};

const SingleColumnLayout = ({ children }: Props) =>
    <div className="flex flex-col justify-center p-6 my-auto">
        {children}
    </div>

export default SingleColumnLayout;