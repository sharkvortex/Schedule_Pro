import styled from "styled-components";

interface LoaderProps {
  size?: number;
}

const Loading = ({ size = 28 }: LoaderProps) => {
  return (
    <StyledWrapper size={size}>
      <div className="spinner">
        {Array.from({ length: 12 }).map((_, i) => (
          <div className="spinner-blade" key={i} />
        ))}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div<{ size: number }>`
  .spinner {
    font-size: ${({ size }) => size}px;
    position: relative;
    display: inline-block;
    width: 1em;
    height: 1em;
  }

  

  .spinner .spinner-blade {
    position: absolute;
    left: 0.4629em;
    bottom: 0;
    width: 0.074em;
    height: 0.2777em;
    border-radius: 0.0555em;
    background-color: transparent;
    transform-origin: center -0.2222em;
    animation: spinner-fade9234 1s infinite linear;
  }

  ${Array.from({ length: 12 })
    .map((_, i) => {
      const deg = i * 30;
      const delay = (i * 0.083).toFixed(3);
      return `
        .spinner .spinner-blade:nth-child(${i + 1}) {
          animation-delay: ${delay}s;
          transform: rotate(${deg}deg);
        }
      `;
    })
    .join("")}

  @keyframes spinner-fade9234 {
    0% {
      background-color: #ffff;
    }
    100% {
      background-color: transparent;
    }
  }
`;

export default Loading;
