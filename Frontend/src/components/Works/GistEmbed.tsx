import React from "react";
import Gist from "react-gist";

interface GistEmbedProps {
  gistId: string; 
}

const GistEmbed: React.FC<GistEmbedProps> = ({ gistId }) => {
  if (!gistId) return null;

  return <Gist  id={gistId} />;
};

export default GistEmbed;


export function extractGistIdFromEmbed(embedCode: string): string {
 
  const urlMatch = embedCode.match(/https:\/\/gist\.github\.com\/([^/]+)\/([a-f0-9]+)/i);
  if (urlMatch) {
    return `${urlMatch[1]}/${urlMatch[2]}`;
  }
  return "";
}