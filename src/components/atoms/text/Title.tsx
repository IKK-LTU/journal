import React from "react";
import styled from "styled-components";

// Base props for the component
type PolymorphicProps<C extends React.ElementType> = {
  component?: C;
  children: React.ReactNode | string;
} & React.ComponentPropsWithoutRef<C>;

// Generic functional component
const Title = <C extends React.ElementType = "h1">({
  component,
  children,
  ...props
}: PolymorphicProps<C>) => {
  const Component = component || "h1";

  return <Component {...props}>{children}</Component>;
};

const StyledComponent = styled(Title)<{ component?: React.ElementType }>`
  ${(props) => {
    switch (props.component) {
      case "h1":
        return `
          font-size: 2.5rem;
          font-weight: bold;
        `;
      case "h2":
        return `
          font-size: 2rem;
          font-weight: semi-bold;
        `;
      case "h3":
        return `
          font-size: 1.75rem;
          font-weight: semi-bold;
        `;
        case "h4":
        return `
          font-size: 1.5rem;
          font-weight: semi-bold;
        `;
        case "h5":
        return `
          font-size: 1.25rem;
          font-weight: semi-bold;
        `;
        case "h6":
        return `
          font-size: 1rem;
          font-weight: semi-bold;
        `;
      default:
        return ` `;
    }
  }}
`;

export default StyledComponent;
