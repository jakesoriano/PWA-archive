export const communitySort = [
  {
    label: 'Popularity',
    value: 'popularity',
    params: {
      o: 'followers',
      sort: false
    }
  },
  {
    label: 'Alphabetical A - Z',
    value: 'asc',
    params: {
      o: 'name',
      o_istext: true,
      sort: true
    }
  },
  {
    label: 'Alphabetical Z - A',
    value: 'desc',
    params: {
      o: 'name',
      o_istext: true,
      sort: false
    }
  }
]

