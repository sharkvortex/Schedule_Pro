import styled from 'styled-components';
interface LoaderProps {
  size?: number; 
}

const Loader = ({ size = 28 }: LoaderProps) => {

  return (
    <div className='z-10 w-full min-h-screen fixed top-0 loader'>
    <StyledWrapper size={size} >
      <div className="spinner center">
        {Array.from({ length: 12 }).map((_, i) => (
          <div className="spinner-blade" key={i} />
        ))}
      </div>
    </StyledWrapper>
    </div>
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

  .spinner.center {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
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
    .join('')}

  @keyframes spinner-fade9234 {
    0% {
      background-color: #69717d;
    }
    100% {
      background-color: transparent;
    }
  }
`;

export default Loader;
