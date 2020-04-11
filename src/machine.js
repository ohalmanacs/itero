import { Machine, assign } from 'xstate';

function generateTestContext() {
  return {
    currentNodeId: null,
    nodes: {
      '1': {
        id: 1,
        name: 'foo',
        entries: ['a', 'b', 'c'],
      },
      '2': {
        id: 2,
        name: 'bar',
        entries: ['4', '5' ],
      },
      '4': {
        id: 4,
        name: 'baz',
        entries: ['alpha', 'beta', 'gamma', 'delta']
      }
    },
    displayNodes: [1, 2, 4],
    displayNodeEntries: [],
  };
}

const nodeStates = {
  initial: 'navigating',
  states: {
    navigating: {
      on: {
        START_EDIT: {
          target: 'editing'
        }
      }
    },

    editing: {
      on: {
        SAVE: {
          target: 'navigating',
        }
      }
    }
  }
}

let createNodeAction = assign(ctxt => {
  return {
    displayNodeEntries: [],
  };
});

export default (viewNodeAction) => {
  return Machine({
    id: 'flowiki',
    initial: 'top',
    context: generateTestContext(),
    states: {
      top: {
        on: {
          VIEW_NODE: {
            target: 'node',
            actions: viewNodeAction,
          },
          CREATE_NODE: {
            target: 'node',
            actions: createNodeAction,
          },
        },
      },
      node: {
        on: {
          BACK: {
            target: 'top',
          }
        },
        ...nodeStates
      }
    }
  });
};