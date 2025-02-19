import type { IParticlesOptions } from "../Options/Interfaces/Particles/IParticlesOptions.js";

/**
 
 * [[include:Options/Particles/Group.md]]
 */
export type ParticlesGroups = {
    [name: string]: IParticlesOptions;
};
