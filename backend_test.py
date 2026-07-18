import requests
import json

# Backend URL from frontend/.env
BACKEND_URL = "https://trust-verify-140.preview.emergentagent.com/api"

def test_root_endpoint():
    """Test GET /api/ endpoint"""
    print("\n" + "="*60)
    print("TEST 1: GET /api/ - Root Endpoint")
    print("="*60)
    try:
        response = requests.get(f"{BACKEND_URL}/")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        assert response.json() == {"message": "Hello World"}, "Unexpected response"
        print("✅ PASSED: Root endpoint working")
        return True
    except Exception as e:
        print(f"❌ FAILED: {str(e)}")
        return False

def test_create_status_check():
    """Test POST /api/status endpoint"""
    print("\n" + "="*60)
    print("TEST 2: POST /api/status - Create Status Check")
    print("="*60)
    try:
        payload = {"client_name": "fraud_detection_test"}
        response = requests.post(f"{BACKEND_URL}/status", json=payload)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        data = response.json()
        assert "id" in data, "Missing 'id' field"
        assert data["client_name"] == "fraud_detection_test", "client_name mismatch"
        assert "timestamp" in data, "Missing 'timestamp' field"
        print("✅ PASSED: Status check creation working")
        return True
    except Exception as e:
        print(f"❌ FAILED: {str(e)}")
        return False

def test_get_status_checks():
    """Test GET /api/status endpoint"""
    print("\n" + "="*60)
    print("TEST 3: GET /api/status - Get Status Checks")
    print("="*60)
    try:
        response = requests.get(f"{BACKEND_URL}/status")
        print(f"Status Code: {response.status_code}")
        data = response.json()
        print(f"Response: Retrieved {len(data)} status checks")
        if len(data) > 0:
            print(f"Sample: {json.dumps(data[0], indent=2)}")
        assert response.status_code == 200, f"Expected 200, got {response.status_code}"
        assert isinstance(data, list), "Expected list response"
        print("✅ PASSED: Status check retrieval working")
        return True
    except Exception as e:
        print(f"❌ FAILED: {str(e)}")
        return False

def test_fraud_detection_endpoints():
    """Check if fraud detection endpoints exist"""
    print("\n" + "="*60)
    print("TEST 4: Fraud Detection Endpoints Check")
    print("="*60)
    
    endpoints_to_check = [
        "/auth/login",
        "/auth/signup",
        "/transactions",
        "/transactions/analyze",
        "/fraud/analyze"
    ]
    
    print("Checking for fraud detection related endpoints...")
    for endpoint in endpoints_to_check:
        try:
            response = requests.get(f"{BACKEND_URL}{endpoint}")
            if response.status_code != 404:
                print(f"  ✓ Found: {endpoint} (Status: {response.status_code})")
            else:
                print(f"  ✗ Not Found: {endpoint}")
        except Exception as e:
            print(f"  ✗ Error checking {endpoint}: {str(e)}")
    
    print("\n⚠️  IMPORTANT: No fraud detection endpoints found in backend")
    print("   The 'Analyze New Transaction' feature is frontend-only with mock data")
    return False

if __name__ == "__main__":
    print("\n" + "="*60)
    print("BACKEND API TESTING - FRAUD DETECTION APP")
    print("="*60)
    print(f"Backend URL: {BACKEND_URL}")
    
    results = []
    results.append(("Root Endpoint", test_root_endpoint()))
    results.append(("Create Status Check", test_create_status_check()))
    results.append(("Get Status Checks", test_get_status_checks()))
    test_fraud_detection_endpoints()
    
    print("\n" + "="*60)
    print("TEST SUMMARY")
    print("="*60)
    passed = sum(1 for _, result in results if result)
    total = len(results)
    print(f"Passed: {passed}/{total}")
    for name, result in results:
        status = "✅ PASSED" if result else "❌ FAILED"
        print(f"  {status}: {name}")
    
    print("\n" + "="*60)
    print("FRAUD DETECTION FEATURE ANALYSIS")
    print("="*60)
    print("⚠️  The 'Analyze New Transaction' feature has NO backend implementation")
    print("   - All fraud detection logic is in frontend (Dashboard.jsx)")
    print("   - Uses mock data (mockData.js)")
    print("   - Risk scoring is client-side JavaScript")
    print("   - No API calls are made for transaction analysis")
    print("   - Login is mock (localStorage only, no backend auth)")
    print("\n✋ FRONTEND TESTING REQUIRED to verify this feature")
    print("="*60)
