const mapping = {
  'Locket': ['Gold', 'pro'] // Kích hoạt cả entitlement Gold và Pro
};
//Code By Hoàng Hải
var ua = $request.headers["User-Agent"] || $request.headers["user-agent"];
var obj = JSON.parse($response.body);

obj.Attention = "Đã kích hoạt Locket Gold - Chúc bạn trải nghiệm vui vẻ!";

var subscription_data = {
  "is_sandbox": false,
  "ownership_type": "PURCHASED",
  "billing_issues_detected_at": null,
  "period_type": "normal",
  "expires_date": "2099-12-31T23:59:59Z",
  "grace_period_expires_date": null,
  "unsubscribe_detected_at": null,
  "original_purchase_date": "2026-01-15T00:00:00Z",
  "purchase_date": "2023-01-15T00:00:00Z",
  "store": "app_store"
};

var entitlement_data = {
  "grace_period_expires_date": null,
  "purchase_date": "2026-01-15T00:00:00Z",
  "product_identifier": "locket_gold_yearly",
  "expires_date": "2099-12-31T23:59:59Z"
};

const match = Object.keys(mapping).find(e => ua.includes(e));

if (match) {
  let entitlements = mapping[match];
  
  obj.subscriber.subscriptions["locket_gold_yearly"] = subscription_data;
  
  // Kích hoạt tất cả các quyền lợi (Gold, Pro...)
  entitlements.forEach(e => {
    obj.subscriber.entitlements[e] = entitlement_data;
  });
}

$done({ body: JSON.stringify(obj) });
