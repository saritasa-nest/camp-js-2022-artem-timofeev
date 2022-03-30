import { createEntityAdapter } from '@reduxjs/toolkit';
import { Character } from '../../models/character';

export const charactersAdapter = createEntityAdapter<Character>({
  selectId: character => character.id,
});

/**
 * Films state.
 */
interface CharactersState {

  /** Error. */
  readonly error?: string;

  /** Error. */
  readonly allCharacters: Character[] | [];
}

export const initialState = charactersAdapter.getInitialState<CharactersState>({ allCharacters: [] });