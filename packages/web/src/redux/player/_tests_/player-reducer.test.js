import playReducer from '../player-reducer';
import * as PlayerTypes from '../player-types';

describe('Player reducer behavior', () => {
  test('should action player_play return playing now the payload string and queue empty array', () => {
    const playerInitialState = {
      queue: ['probe', 'probe'],
      playingNow: 'probe',

      isAddingSongPlayed: false,
      songPlayedError: null,
      songPlayedSuccess: false,
    };
    const text = 'test message';
    const action = { type: PlayerTypes.PLAYER_PLAY, payload: text };

    const { queue, playingNow } = playReducer(playerInitialState, action);

    expect(queue).toEqual([]);
    expect(playingNow).toBe(text);
  });

  test('should return the same state', () => {
    const playerInitialState = {
      queue: ['probe', 'probe'],
      playingNow: 'probe',

      isAddingSongPlayed: false,
      songPlayedError: null,
      songPlayedSuccess: false,
    };
    const action = { type: 'test' };

    const newState = playReducer(playerInitialState, action);

    expect(newState).toEqual(playerInitialState);
  });

  test('should action player_add_to_queue return playing now the payload string when queue is empty', () => {
    const playerInitialState = {
      queue: [],
      playingNow: '',

      isAddingSongPlayed: false,
      songPlayedError: null,
      songPlayedSuccess: false,
    };
    const text = 'test message';
    const action = { type: PlayerTypes.PLAYER_ADD_TO_QUEUE, payload: text };

    const { queue, playingNow } = playReducer(playerInitialState, action);

    expect(queue).toEqual([]);
    expect(playingNow).toBe(text);
  });

  test('should action player_add_to_queue return playing now string old state and add queue the payload', () => {
    const textOldState = 'text';
    const queueOldState = ['probe', 'probe'];
    const playerInitialState = {
      queue: queueOldState,
      playingNow: textOldState,

      isAddingSongPlayed: false,
      songPlayedError: null,
      songPlayedSuccess: false,
    };
    const text = 'test message';
    const action = { type: PlayerTypes.PLAYER_ADD_TO_QUEUE, payload: text };

    const { queue, playingNow } = playReducer(playerInitialState, action);

    expect(queue).toEqual([...queueOldState, text]);
    expect(playingNow).toBe(textOldState);
  });

  test('should action player_add_to_queue return the old state when in playing now is the same song', () => {
    const text = 'test message';
    const queueOldState = ['probe', 'probe'];
    const playerInitialState = {
      queue: queueOldState,
      playingNow: text,

      isAddingSongPlayed: false,
      songPlayedError: null,
      songPlayedSuccess: false,
    };
    const action = { type: PlayerTypes.PLAYER_ADD_TO_QUEUE, payload: text };

    const state = playReducer(playerInitialState, action);

    expect(state).toEqual(playerInitialState);
  });

  test('should action player_add_to_queue return the old state when in queue there is the same song', () => {
    const text = 'test message';
    const queueOldState = ['probe', 'probe2', text];
    const playerInitialState = {
      queue: queueOldState,
      playingNow: 'probe1',

      isAddingSongPlayed: false,
      songPlayedError: null,
      songPlayedSuccess: false,
    };
    const action = { type: PlayerTypes.PLAYER_ADD_TO_QUEUE, payload: text };

    const state = playReducer(playerInitialState, action);

    expect(state).toEqual(playerInitialState);
  });
});
