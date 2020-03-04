using System.Net.Http;
using System.Threading.Tasks;

namespace Telenotify.Client
{
    public class TelenotifyClient
    {
        private readonly HttpClient _httpClient;
        private readonly TelenotifyClientSettings _settings;

        public TelenotifyClient(TelenotifyClientSettings settings)
        {
            _httpClient = new HttpClient();
            _settings = settings;
        }

        public async Task<bool> Send(string message)
        {
            try
            {
                var url = string.Format("{0}?key={1}&text={2}", _settings.Server, _settings.Key, message);
                var response = await _httpClient.GetAsync(url);

                response.EnsureSuccessStatusCode();

                return true;
            }
            catch (HttpRequestException)
            {
                return false;
            }
        }
    }
}
