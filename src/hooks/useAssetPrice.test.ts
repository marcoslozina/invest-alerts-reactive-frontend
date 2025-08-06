import { renderHook, waitFor } from '@testing-library/react';
import { useAssetPrice } from './useAssetPrice';
import axios from 'axios';

// Mockear axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('useAssetPrice', () => {
  afterEach(() => {
    jest.clearAllMocks();
    jest.useRealTimers();
  });

  it('fetches price successfully', async () => {
    const mockData = {
      symbol: 'BTC',
      price: 50000,
      timestamp: '2025-08-06T12:00:00Z',
    };

    mockedAxios.get.mockResolvedValueOnce({ data: mockData });

    const { result } = renderHook(() => useAssetPrice('BTC'));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it('handles error and returns fallback mock', async () => {
    mockedAxios.get.mockRejectedValueOnce(new Error('Network Error'));

    const { result } = renderHook(() => useAssetPrice('BTC'));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data?.symbol).toBe('BTC');
    expect(result.current.data?.price).toBe(30123.45);
    expect(result.current.error).toBe('Network Error');
  });
});