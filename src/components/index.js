import styled from "styled-components";
export const ActionBtn = styled.button`
  display: flex;
  flex-flow: row;
  padding: 16px;
  background: none;
  border: 1px solid rgba(0, 0, 0, 0.2);
  font-weight: 800;
  align-items: center;
  gap: 8px;
  color: rgba(0, 0, 0, 0.5);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  margin: 0px 10px;
  cursor: pointer;
`;

export const CallCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: flex-start;
  padding: 10px 16px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin: 8px 10px;
  border-radius: 8px;
  height: 36px;
  overflow: hidden;
  &.card-open {
    height: max-content;
  }
  & .hidden {
    visibility: hidden;
  }
  & .visible {
    visibility: visible;
  }
`;

export const CallCardMainContent = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  justify-content: center;
  align-items: center;
`;

export const CallCardDetailsContent = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
  width: 100%;
  color: rgba(0, 0, 0, 0.4);
  overflow: auto;
`;

export const CallCardDetails = styled.div`
 display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 8px;
`

export const FromGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 50%;
  flex-wrap: wrap;
  gap: 4px;
`;

export const Time = styled.div`
  font-weight: 800;
  flex-basis: 10%;
  color: gray;
`;

export const MiniActionBtn = styled.button`
  color: rgba(0, 0, 0, 0.3);
  flex-basis: 10%;
  background: none;
  border: none;
  cursor: pointer;
`;

export const Number = styled.div`
  font-weight: 800;
`;

export const Description = styled.div`
  font-weight: 100;
  color: rgba(0, 0, 0, 0.5);
  width: 150px;
  text-overflow: ellipsis;
  height: 16px;
  white-space: nowrap;
  overflow: hidden;
`;

export const FromGroupRow = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  align-items: center;
`;

export const NumberOfCalls = styled.div`
  background: linear-gradient(rgba(255, 0, 0, 1), rgba(155, 0, 0, 1));
  color: white;
  border-radius: 100%;
  width: 13px;
  height: 13px;
  font-weight: 800;
  font-size: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1px;  /* minor adjustment */
`;

export const Loader = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  & .loading-icon {
    animation: rotateForEver 2s infinite;
    @keyframes rotateForEver {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
`;

export const Hr = styled.hr`
  border: none;
  border-top: 2px dotted rgba(0, 0, 0, 0.2);
  color: #333;
  overflow: visible;
  text-align: center;
  height: 5px;
  width: 100%;
  &::after {
    content: ${(props) => `"${props.$content || ''}"`};
    display: inline-block;
    position: relative;
    top: -0.65em;
    background-color: white;
    color: gray;
    padding: 0 8px;
  }
`;
